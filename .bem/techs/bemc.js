var BEM = require('bem'),
    Q = BEM.require('q'),
    PATH = require('path');

exports.techMixin = {

    getBuildResultChunk: function(relPath, path, suffix) {

        return BEM.util.readFile(path)
            .then(function(c) {

                return [
                    '/* ' + path + ': start */',
                    c,
                    '/* ' + path + ': end */',
                    '\n'
                ].join('\n');

            });

    },

    getBuildResult: function(prefixes, suffix, outputDir, outputName) {

        var _this = this;
        return this.filterPrefixes(prefixes, this.getCreateSuffixes())
            .then(function(paths) {
                return Q.all(paths.map(function(path) {
                    return _this.getBuildResultChunk(
                        PATH.relative(outputDir, path), path, suffix);
                }));
            })
            .then(function(sources) {
                return _this.getTranslatedTemplates(sources.join('\n'));
            });

    },

    getTranslatedTemplates: function(source) {
        throw new Error('getTranslatedTemplates(): Not implemented');
    },

    getSuffixes: function() {
        throw new Error('getSuffixes(): Not implemented');
    },

    getBuildSuffixes: function() {
        throw new Error('getBuildSuffixes(): Not implemented');
    }

};
