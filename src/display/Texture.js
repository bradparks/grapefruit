var Texture = module.exports = require('../vendor/pixi').Texture,
    utils = require('../utils/utils'),
    PIXI = require('../vendor/pixi');

//These create arrays of textures based on texture atlas data

// JSON
Texture.fromJSON = function(key, json, baseTexture) {
    if(!json.frames) {
        utils.warn('Invalid Texture Atlas JSON for fromJSON, missing "frames" array, full json:', json);
        return;
    }

    var frames = json.frames,
        textures = {},
        subkey;

    if(frames.length) {
        for(var i = 0, il = frames.length; i < il; ++i) {
            subkey = key + '_' + frames[i].filename;
            textures[frames[i].filename] = Texture._createFrame(subkey, frames[i], baseTexture);
        }
    } else {
        for(var k in frames) {
            subkey = key + '_' + k;
            textures[k] = Texture._createFrame(subkey, frames[k], baseTexture);
        }
    }

    return textures;
};

Texture._createFrame = function(key, data, baseTexture) {
    var rect = data.frame;

    if(rect) {
        var tx = PIXI.TextureCache[key] = new Texture(baseTexture, {
            x: rect.x,
            y: rect.y,
            width: rect.w,
            height: rect.h
        });

        tx.trimmed = data.trimmed;
        tx.rotated = data.rotated;
        tx.sourceSize = data.sourceSize;
        tx.realSize = data.spriteSourceSize;

        return tx;
    }
};

// XML
Texture.fromXML = function(key, xml, baseTexture) {
    if(!xml.getElementsByTagName('TextureAtlas')) {
        utils.warn('Invalid Texture Atlas XML given, missing <TextureAtlas> tag, full xml:', xml);
        return;
    }

    var frames = xml.getElementsByTagName('SubTexture') || xml.getElementsByTagName('sprite'),
        textures = {};

    for(var i = 0; i < frames.length; i++) {
        var frame = frames[i],
            attrs = frame.attributes.getNamedItem,
            name = attrs('name') || attrs('n'),
            //sprite
            x = attrs('x'),
            y = attrs('y'),
            width = attrs('width') || attrs('w'),
            height = attrs('height') || attrs('h'),
            //trim
            ox = attrs('frameX') || attrs('oX'),
            oy = attrs('frameY') || attrs('oY'),
            owidth = attrs('frameWidth') || attrs('oW'),
            oheight = attrs('frameHeight') || attrs('oH'),
            //rotated (generic xml export)
            rotated = !!attrs('r');

        var tx = textures[name] = PIXI.TextureCache[key + '_' + name] = new Texture(baseTexture, {
            x: parseInt(x.nodeValue, 10),
            y: parseInt(y.nodeValue, 10),
            width: parseInt(width.nodeValue, 10),
            height: parseInt(height.nodeValue, 10)
        });

        tx.trimmed = ox && oy;
        tx.rotated = rotated;

        if(tx.trimmed) {
            tx.sourceSize = {
                w: parseInt(owidth.nodeValue, 10),
                h: parseInt(oheight.nodeValue, 10)
            };

            tx.realSize = {
                x: Math.abs(parseInt(ox.nodeValue, 10)),
                y: Math.abs(parseInt(oy.nodeValue, 10)),
                w: parseInt(owidth.nodeValue, 10),
                h: parseInt(oheight.nodeValue, 10)
            };
        }
    }

    return textures;
};

// create textures from sprite sheet
//obj.key
//obj.texture
//obj.image
//obj.frameWidth
//obj.frameHeight
//obj.numFrames
Texture.fromSpritesheet = function(obj) {
    return obj;
};
