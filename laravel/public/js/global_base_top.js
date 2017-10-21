/**
 * Created by Qiujianjun on 2017/10/13.
 */
/* SVN.committedRevision=de3aadf */
var requirejs, require, define;
(function (global) {
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = "2.1.11", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty,
        ap = Array.prototype, apsp = ap.splice,
        isBrowser = !!(typeof window !== "undefined" && typeof navigator !== "undefined" && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== "undefined",
        readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_", isOpera = typeof opera !== "undefined" && opera.toString() === "[object Opera]",
        contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = false;

    function isFunction(it) {
        return ostring.call(it) === "[object Function]"
    }

    function isArray(it) {
        return ostring.call(it) === "[object Array]"
    }

    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break
                }
            }
        }
    }

    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop)
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop]
    }

    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break
                }
            }
        }
    }

    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === "object" && value && !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {
                        if (!target[prop]) {
                            target[prop] = {}
                        }
                        mixin(target[prop], value, force, deepStringMixin)
                    } else {
                        target[prop] = value
                    }
                }
            })
        }
        return target
    }

    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(err) {
        throw err
    }

    function getGlobal(value) {
        if (!value) {
            return value
        }
        var g = global;
        each(value.split("."), function (part) {
            g = g[part]
        });
        return g
    }

    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + "\nhttp://requirejs.org/docs/errors.html#" + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err
        }
        return e
    }

    if (typeof define !== "undefined") {
        return
    }
    if (typeof requirejs !== "undefined") {
        if (isFunction(requirejs)) {
            return
        }
        cfg = requirejs;
        requirejs = undefined
    }
    if (typeof require !== "undefined" && !isFunction(require)) {
        cfg = require;
        require = undefined
    }
    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId,
            config = {waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {}},
            registry = {}, enabledRegistry = {}, undefEvents = {}, defQueue = [], defined = {}, urlFetched = {},
            bundlesMap = {}, requireCounter = 1, unnormalizedCounter = 1;

        function trimDots(ary) {
            var i, part, length = ary.length;
            for (i = 0; i < length; i++) {
                part = ary[i];
                if (part === ".") {
                    ary.splice(i, 1);
                    i -= 1
                } else {
                    if (part === "..") {
                        if (i === 1 && (ary[2] === ".." || ary[0] === "..")) {
                            break
                        } else {
                            if (i > 0) {
                                ary.splice(i - 1, 2);
                                i -= 2
                            }
                        }
                    }
                }
            }
        }

        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex, foundMap, foundI, foundStarMap, starI,
                baseParts = baseName && baseName.split("/"), normalizedBaseParts = baseParts, map = config.map,
                starMap = map && map["*"];
            if (name && name.charAt(0) === ".") {
                if (baseName) {
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = name.split("/");
                    lastIndex = name.length - 1;
                    if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                        name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, "")
                    }
                    name = normalizedBaseParts.concat(name);
                    trimDots(name);
                    name = name.join("/")
                } else {
                    if (name.indexOf("./") === 0) {
                        name = name.substring(2)
                    }
                }
            }
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split("/");
                outerLoop:for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join("/");
                    if (baseParts) {
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join("/"));
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop
                                }
                            }
                        }
                    }
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i
                    }
                }
                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI
                }
                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join("/")
                }
            }
            pkgMain = getOwn(config.pkgs, name);
            return pkgMain ? pkgMain : name
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute("data-requiremodule") === name && scriptNode.getAttribute("data-requirecontext") === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true
                    }
                })
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                pathConfig.shift();
                context.require.undef(id);
                context.require([id]);
                return true
            }
        }

        function splitPrefix(name) {
            var prefix, index = name ? name.indexOf("!") : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length)
            }
            return [prefix, name]
        }

        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts, prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null, originalName = name, isDefine = true,
                normalizedName = "";
            if (!name) {
                isDefine = false;
                name = "_@r" + (requireCounter += 1)
            }
            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];
            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix)
            }
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap)
                        })
                    } else {
                        normalizedName = normalize(name, parentName, applyMap)
                    }
                } else {
                    normalizedName = normalize(name, parentName, applyMap);
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;
                    url = context.nameToUrl(normalizedName)
                }
            }
            suffix = prefix && !pluginModule && !isNormalized ? "_unnormalized" + (unnormalizedCounter += 1) : "";
            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ? prefix + "!" + normalizedName : normalizedName) + suffix
            }
        }

        function getModule(depMap) {
            var id = depMap.id, mod = getOwn(registry, id);
            if (!mod) {
                mod = registry[id] = new context.Module(depMap)
            }
            return mod
        }

        function on(depMap, name, fn) {
            var id = depMap.id, mod = getOwn(registry, id);
            if (hasProp(defined, id) && (!mod || mod.defineEmitComplete)) {
                if (name === "defined") {
                    fn(defined[id])
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === "error") {
                    fn(mod.error)
                } else {
                    mod.on(name, fn)
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules, notified = false;
            if (errback) {
                errback(err)
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit("error", err)
                        }
                    }
                });
                if (!notified) {
                    req.onError(err)
                }
            }
        }

        function takeGlobalQueue() {
            if (globalDefQueue.length) {
                apsp.apply(defQueue, [defQueue.length, 0].concat(globalDefQueue));
                globalDefQueue = []
            }
        }

        handlers = {
            require: function (mod) {
                if (mod.require) {
                    return mod.require
                } else {
                    return (mod.require = context.makeRequire(mod.map))
                }
            }, exports: function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports)
                    } else {
                        return (mod.exports = defined[mod.map.id] = {})
                    }
                }
            }, module: function (mod) {
                if (mod.module) {
                    return mod.module
                } else {
                    return (mod.module = {
                        id: mod.map.id, uri: mod.map.url, config: function () {
                            return getOwn(config.config, mod.map.id) || {}
                        }, exports: mod.exports || (mod.exports = {})
                    })
                }
            }
        };
        function cleanRegistry(id) {
            delete registry[id];
            delete enabledRegistry[id]
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;
            if (mod.error) {
                mod.emit("error", mod.error)
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id, dep = getOwn(registry, depId);
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check()
                        } else {
                            breakCycle(dep, traced, processed)
                        }
                    }
                });
                processed[id] = true
            }
        }

        function checkLoaded() {
            var err, usingPathFallback, waitInterval = config.waitSeconds * 1000,
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(), noLoads = [],
                reqCalls = [], stillLoading = false, needCycleCheck = true;
            if (inCheckLoaded) {
                return
            }
            inCheckLoaded = true;
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map, modId = map.id;
                if (!mod.enabled) {
                    return
                }
                if (!map.isDefine) {
                    reqCalls.push(mod)
                }
                if (!mod.error) {
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true
                        } else {
                            noLoads.push(modId);
                            removeScript(modId)
                        }
                    } else {
                        if (!mod.inited && mod.fetched && map.isDefine) {
                            stillLoading = true;
                            if (!map.prefix) {
                                return (needCycleCheck = false)
                            }
                        }
                    }
                }
            });
            if (expired && noLoads.length) {
                err = makeError("timeout", "Load timeout for modules: " + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err)
            }
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {})
                })
            }
            if ((!expired || usingPathFallback) && stillLoading) {
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded()
                    }, 50)
                }
            }
            inCheckLoaded = false
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0
        };
        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};
                if (this.inited) {
                    return
                }
                this.factory = factory;
                if (errback) {
                    this.on("error", errback)
                } else {
                    if (this.events.error) {
                        errback = bind(this, function (err) {
                            this.emit("error", err)
                        })
                    }
                }
                this.depMaps = depMaps && depMaps.slice(0);
                this.errback = errback;
                this.inited = true;
                this.ignore = options.ignore;
                if (options.enabled || this.enabled) {
                    this.enable()
                } else {
                    this.check()
                }
            }, defineDep: function (i, depExports) {
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports
                }
            }, fetch: function () {
                if (this.fetched) {
                    return
                }
                this.fetched = true;
                context.startTime = (new Date()).getTime();
                var map = this.map;
                if (this.shim) {
                    context.makeRequire(this.map, {enableBuildCallback: true})(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load()
                    }))
                } else {
                    return map.prefix ? this.callPlugin() : this.load()
                }
            }, load: function () {
                var url = this.map.url;
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url)
                }
            }, check: function () {
                if (!this.enabled || this.enabling) {
                    return
                }
                var err, cjsModule, id = this.map.id, depExports = this.depExports, exports = this.exports,
                    factory = this.factory;
                if (!this.inited) {
                    this.fetch()
                } else {
                    if (this.error) {
                        this.emit("error", this.error)
                    } else {
                        if (!this.defining) {
                            this.defining = true;
                            if (this.depCount < 1 && !this.defined) {
                                if (isFunction(factory)) {
                                    if ((this.events.error && this.map.isDefine) || req.onError !== defaultOnError) {
                                        try {
                                            exports = context.execCb(id, factory, depExports, exports)
                                        } catch (e) {
                                            err = e
                                        }
                                    } else {
                                        exports = context.execCb(id, factory, depExports, exports)
                                    }
                                    if (this.map.isDefine && exports === undefined) {
                                        cjsModule = this.module;
                                        if (cjsModule) {
                                            exports = cjsModule.exports
                                        } else {
                                            if (this.usingExports) {
                                                exports = this.exports
                                            }
                                        }
                                    }
                                    if (err) {
                                        err.requireMap = this.map;
                                        err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                        err.requireType = this.map.isDefine ? "define" : "require";
                                        return onError((this.error = err))
                                    }
                                } else {
                                    exports = factory
                                }
                                this.exports = exports;
                                if (this.map.isDefine && !this.ignore) {
                                    defined[id] = exports;
                                    if (req.onResourceLoad) {
                                        req.onResourceLoad(context, this.map, this.depMaps)
                                    }
                                }
                                cleanRegistry(id);
                                this.defined = true
                            }
                            this.defining = false;
                            if (this.defined && !this.defineEmitted) {
                                this.defineEmitted = true;
                                this.emit("defined", this.exports);
                                this.defineEmitComplete = true
                            }
                        }
                    }
                }
            }, callPlugin: function () {
                var map = this.map, id = map.id, pluginMap = makeModuleMap(map.prefix);
                this.depMaps.push(pluginMap);
                on(pluginMap, "defined", bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod, bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name, parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {enableBuildCallback: true});
                    if (this.map.unnormalized) {
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                    return normalize(name, parentName, true)
                                }) || ""
                        }
                        normalizedMap = makeModuleMap(map.prefix + "!" + name, this.map.parentMap);
                        on(normalizedMap, "defined", bind(this, function (value) {
                            this.init([], function () {
                                return value
                            }, null, {enabled: true, ignore: true})
                        }));
                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            this.depMaps.push(normalizedMap);
                            if (this.events.error) {
                                normalizedMod.on("error", bind(this, function (err) {
                                    this.emit("error", err)
                                }))
                            }
                            normalizedMod.enable()
                        }
                        return
                    }
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return
                    }
                    load = bind(this, function (value) {
                        this.init([], function () {
                            return value
                        }, null, {enabled: true})
                    });
                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + "_unnormalized") === 0) {
                                cleanRegistry(mod.map.id)
                            }
                        });
                        onError(err)
                    });
                    load.fromText = bind(this, function (text, textAlt) {
                        var moduleName = map.name, moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;
                        if (textAlt) {
                            text = textAlt
                        }
                        if (hasInteractive) {
                            useInteractive = false
                        }
                        getModule(moduleMap);
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id]
                        }
                        try {
                            req.exec(text)
                        } catch (e) {
                            return onError(makeError("fromtexteval", "fromText eval for " + id + " failed: " + e, e, [id]))
                        }
                        if (hasInteractive) {
                            useInteractive = true
                        }
                        this.depMaps.push(moduleMap);
                        context.completeLoad(moduleName);
                        localRequire([moduleName], load)
                    });
                    plugin.load(map.name, localRequire, load, config)
                }));
                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap
            }, enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;
                this.enabling = true;
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;
                    if (typeof depMap === "string") {
                        depMap = makeModuleMap(depMap, (this.map.isDefine ? this.map : this.map.parentMap), false, !this.skipMap);
                        this.depMaps[i] = depMap;
                        handler = getOwn(handlers, depMap.id);
                        if (handler) {
                            this.depExports[i] = handler(this);
                            return
                        }
                        this.depCount += 1;
                        on(depMap, "defined", bind(this, function (depExports) {
                            this.defineDep(i, depExports);
                            this.check()
                        }));
                        if (this.errback) {
                            on(depMap, "error", bind(this, this.errback))
                        }
                    }
                    id = depMap.id;
                    mod = registry[id];
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this)
                    }
                }));
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this)
                    }
                }));
                this.enabling = false;
                this.check()
            }, on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = []
                }
                cbs.push(cb)
            }, emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt)
                });
                if (name === "error") {
                    delete this.events[name]
                }
            }
        };
        function callGetModule(args) {
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2])
            }
        }

        function removeListener(node, func, name, ieName) {
            if (node.detachEvent && !isOpera) {
                if (ieName) {
                    node.detachEvent(ieName, func)
                }
            } else {
                node.removeEventListener(name, func, false)
            }
        }

        function getScriptData(evt) {
            var node = evt.currentTarget || evt.srcElement;
            removeListener(node, context.onScriptLoad, "load", "onreadystatechange");
            removeListener(node, context.onScriptError, "error");
            return {node: node, id: node && node.getAttribute("data-requiremodule")}
        }

        function intakeDefines() {
            var args;
            takeGlobalQueue();
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError("mismatch", "Mismatched anonymous define() module: " + args[args.length - 1]))
                } else {
                    callGetModule(args)
                }
            }
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,
            configure: function (cfg) {
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== "/") {
                        cfg.baseUrl += "/"
                    }
                }
                var shim = config.shim, objs = {paths: true, bundles: true, config: true, map: true};
                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {}
                        }
                        mixin(config[prop], value, true, true)
                    } else {
                        config[prop] = value
                    }
                });
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop
                            }
                        })
                    })
                }
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        if (isArray(value)) {
                            value = {deps: value}
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value)
                        }
                        shim[id] = value
                    });
                    config.shim = shim
                }
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;
                        pkgObj = typeof pkgObj === "string" ? {name: pkgObj} : pkgObj;
                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location
                        }
                        config.pkgs[name] = pkgObj.name + "/" + (pkgObj.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                    })
                }
                eachProp(registry, function (mod, id) {
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id)
                    }
                });
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback)
                }
            },
            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments)
                    }
                    return ret || (value.exports && getGlobal(value.exports))
                }

                return fn
            },
            makeRequire: function (relMap, options) {
                options = options || {};
                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;
                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true
                    }
                    if (typeof deps === "string") {
                        if (isFunction(callback)) {
                            return onError(makeError("requireargs", "Invalid require call"), errback)
                        }
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id])
                        }
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire)
                        }
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;
                        if (!hasProp(defined, id)) {
                            return onError(makeError("notloaded", 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? "" : ". Use require([])")))
                        }
                        return defined[id]
                    }
                    intakeDefines();
                    context.nextTick(function () {
                        intakeDefines();
                        requireMod = getModule(makeModuleMap(null, relMap));
                        requireMod.skipMap = options.skipMap;
                        requireMod.init(deps, callback, errback, {enabled: true});
                        checkLoaded()
                    });
                    return localRequire
                }

                mixin(localRequire, {
                    isBrowser: isBrowser, toUrl: function (moduleNamePlusExt) {
                        var ext, index = moduleNamePlusExt.lastIndexOf("."), segment = moduleNamePlusExt.split("/")[0],
                            isRelative = segment === "." || segment === "..";
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index)
                        }
                        return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true)
                    }, defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id)
                    }, specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id)
                    }
                });
                if (!relMap) {
                    localRequire.undef = function (id) {
                        takeGlobalQueue();
                        var map = makeModuleMap(id, relMap, true), mod = getOwn(registry, id);
                        removeScript(id);
                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];
                        eachReverse(defQueue, function (args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1)
                            }
                        });
                        if (mod) {
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events
                            }
                            cleanRegistry(id)
                        }
                    }
                }
                return localRequire
            },
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable()
                }
            },
            completeLoad: function (moduleName) {
                var found, args, mod, shim = getOwn(config.shim, moduleName) || {}, shExports = shim.exports;
                takeGlobalQueue();
                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        if (found) {
                            break
                        }
                        found = true
                    } else {
                        if (args[0] === moduleName) {
                            found = true
                        }
                    }
                    callGetModule(args)
                }
                mod = getOwn(registry, moduleName);
                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return
                        } else {
                            return onError(makeError("nodefine", "No define call for " + moduleName, null, [moduleName]))
                        }
                    } else {
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn])
                    }
                }
                checkLoaded()
            },
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url, parentPath, bundleId, pkgMain = getOwn(config.pkgs, moduleName);
                if (pkgMain) {
                    moduleName = pkgMain
                }
                bundleId = getOwn(bundlesMap, moduleName);
                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt)
                }
                if (req.jsExtRegExp.test(moduleName)) {
                    url = moduleName + (ext || "")
                } else {
                    paths = config.paths;
                    syms = moduleName.split("/");
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join("/");
                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0]
                            }
                            syms.splice(0, i, parentPath);
                            break
                        }
                    }
                    url = syms.join("/");
                    url += (ext || (/^data\:|\?/.test(url) || skipExt ? "" : ".js"));
                    url = (url.charAt(0) === "/" || url.match(/^[\w\+\.\-]+:/) ? "" : config.baseUrl) + url
                }
                return config.urlArgs ? url + ((url.indexOf("?") === -1 ? "?" : "&") + config.urlArgs) : url
            },
            load: function (id, url) {
                req.load(context, id, url)
            },
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args)
            },
            onScriptLoad: function (evt) {
                if (evt.type === "load" || (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    interactiveScript = null;
                    var data = getScriptData(evt);
                    context.completeLoad(data.id)
                }
            },
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError("scripterror", "Script error for: " + data.id, evt, [data.id]))
                }
            }
        };
        context.require = context.makeRequire();
        return context
    }

    req = requirejs = function (deps, callback, errback, optional) {
        var context, config, contextName = defContextName;
        if (!isArray(deps) && typeof deps !== "string") {
            config = deps;
            if (isArray(callback)) {
                deps = callback;
                callback = errback;
                errback = optional
            } else {
                deps = []
            }
        }
        if (config && config.context) {
            contextName = config.context
        }
        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName)
        }
        if (config) {
            context.configure(config)
        }
        return context.require(deps, callback, errback)
    };
    req.config = function (config) {
        return req(config)
    };
    req.nextTick = typeof setTimeout !== "undefined" ? function (fn) {
        setTimeout(fn, 4)
    } : function (fn) {
        fn()
    };
    if (!require) {
        require = req
    }
    req.version = version;
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {contexts: contexts, newContext: newContext};
    req({});
    each(["toUrl", "undef", "defined", "specified"], function (prop) {
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments)
        }
    });
    if (isBrowser) {
        head = s.head = document.getElementsByTagName("head")[0];
        baseElement = document.getElementsByTagName("base")[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode
        }
    }
    req.onError = defaultOnError;
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
        node.type = config.scriptType || "text/javascript";
        node.charset = "utf-8";
        node.async = true;
        return node
    };
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {}, node;
        if (isBrowser) {
            node = req.createNode(config, moduleName, url);
            node.setAttribute("data-requirecontext", context.contextName);
            node.setAttribute("data-requiremodule", moduleName);
            if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0) && !isOpera) {
                useInteractive = true;
                node.attachEvent("onreadystatechange", context.onScriptLoad)
            } else {
                node.addEventListener("load", context.onScriptLoad, false);
                node.addEventListener("error", context.onScriptError, false)
            }
            node.src = url;
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement)
            } else {
                head.appendChild(node)
            }
            currentlyAddingScript = null;
            return node
        } else {
            if (isWebWorker) {
                try {
                    importScripts(url);
                    context.completeLoad(moduleName)
                } catch (e) {
                    context.onError(makeError("importscripts", "importScripts failed for " + moduleName + " at " + url, e, [moduleName]))
                }
            }
        }
    };
    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === "interactive") {
            return interactiveScript
        }
        eachReverse(scripts(), function (script) {
            if (script.readyState === "interactive") {
                return (interactiveScript = script)
            }
        });
        return interactiveScript
    }

    if (isBrowser && !cfg.skipDataMain) {
        eachReverse(scripts(), function (script) {
            if (!head) {
                head = script.parentNode
            }
            dataMain = script.getAttribute("data-main");
            if (dataMain) {
                mainScript = dataMain;
                if (!cfg.baseUrl) {
                    src = mainScript.split("/");
                    mainScript = src.pop();
                    subPath = src.length ? src.join("/") + "/" : "./";
                    cfg.baseUrl = subPath
                }
                mainScript = mainScript.replace(jsSuffixRegExp, "");
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain
                }
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];
                return true
            }
        })
    }
    define = function (name, deps, callback) {
        var node, context;
        if (typeof name !== "string") {
            callback = deps;
            deps = name;
            name = null
        }
        if (!isArray(deps)) {
            callback = deps;
            deps = null
        }
        if (!deps && isFunction(callback)) {
            deps = [];
            if (callback.length) {
                callback.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (match, dep) {
                    deps.push(dep)
                });
                deps = (callback.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(deps)
            }
        }
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute("data-requiremodule")
                }
                context = contexts[node.getAttribute("data-requirecontext")]
            }
        }
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback])
    };
    define.amd = {jQuery: true};
    req.exec = function (text) {
        return eval(text)
    };
    req(cfg)
}(this));
/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */
(function (c, d) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = c.document ? d(c, true) : function (a) {
            if (!a.document) {
                throw new Error("jQuery requires a window with a document")
            }
            return d(a)
        }
    } else {
        d(c)
    }
}(typeof window !== "undefined" ? window : this, function (ch, cQ) {
    var eC = [];
    var c4 = eC.slice;
    var dy = eC.concat;
    var cw = eC.push;
    var cL = eC.indexOf;
    var dt = {};
    var cM = dt.toString;
    var eD = dt.hasOwnProperty;
    var cN = {};
    var di = "1.11.3", ee = function (b, a) {
        return new ee.fn.init(b, a)
    }, cJ = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, er = /^-ms-/, b5 = /-([\da-z])/gi, dh = function (b, a) {
        return a.toUpperCase()
    };
    ee.fn = ee.prototype = {
        jquery: di, constructor: ee, selector: "", length: 0, toArray: function () {
            return c4.call(this)
        }, get: function (a) {
            return a != null ? (a < 0 ? this[a + this.length] : this[a]) : c4.call(this)
        }, pushStack: function (b) {
            var a = ee.merge(this.constructor(), b);
            a.prevObject = this;
            a.context = this.context;
            return a
        }, each: function (a, b) {
            return ee.each(this, a, b)
        }, map: function (a) {
            return this.pushStack(ee.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, slice: function () {
            return this.pushStack(c4.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (b) {
            var a = this.length, c = +b + (b < 0 ? a : 0);
            return this.pushStack(c >= 0 && c < a ? [this[c]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: cw, sort: eC.sort, splice: eC.splice
    };
    ee.extend = ee.fn.extend = function () {
        var l, d, g, f, a, c, h = arguments[0] || {}, j = 1, k = arguments.length, b = false;
        if (typeof h === "boolean") {
            b = h;
            h = arguments[j] || {};
            j++
        }
        if (typeof h !== "object" && !ee.isFunction(h)) {
            h = {}
        }
        if (j === k) {
            h = this;
            j--
        }
        for (; j < k; j++) {
            if ((a = arguments[j]) != null) {
                for (f in a) {
                    l = h[f];
                    g = a[f];
                    if (h === g) {
                        continue
                    }
                    if (b && g && (ee.isPlainObject(g) || (d = ee.isArray(g)))) {
                        if (d) {
                            d = false;
                            c = l && ee.isArray(l) ? l : []
                        } else {
                            c = l && ee.isPlainObject(l) ? l : {}
                        }
                        h[f] = ee.extend(b, c, g)
                    } else {
                        if (g !== undefined) {
                            h[f] = g
                        }
                    }
                }
            }
        }
        return h
    };
    ee.extend({
        expando: "jQuery" + (di + Math.random()).replace(/\D/g, ""), isReady: true, error: function (a) {
            throw new Error(a)
        }, noop: function () {
        }, isFunction: function (a) {
            return ee.type(a) === "function"
        }, isArray: Array.isArray || function (a) {
            return ee.type(a) === "array"
        }, isWindow: function (a) {
            return a != null && a == a.window
        }, isNumeric: function (a) {
            return !ee.isArray(a) && (a - parseFloat(a) + 1) >= 0
        }, isEmptyObject: function (a) {
            var b;
            for (b in a) {
                return false
            }
            return true
        }, isPlainObject: function (b) {
            var a;
            if (!b || ee.type(b) !== "object" || b.nodeType || ee.isWindow(b)) {
                return false
            }
            try {
                if (b.constructor && !eD.call(b, "constructor") && !eD.call(b.constructor.prototype, "isPrototypeOf")) {
                    return false
                }
            } catch (c) {
                return false
            }
            if (cN.ownLast) {
                for (a in b) {
                    return eD.call(b, a)
                }
            }
            for (a in b) {
            }
            return a === undefined || eD.call(b, a)
        }, type: function (a) {
            if (a == null) {
                return a + ""
            }
            return typeof a === "object" || typeof a === "function" ? dt[cM.call(a)] || "object" : typeof a
        }, globalEval: function (a) {
            if (a && ee.trim(a)) {
                (ch.execScript || function (b) {
                    ch["eval"].call(ch, b)
                })(a)
            }
        }, camelCase: function (a) {
            return a.replace(er, "ms-").replace(b5, dh)
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        }, each: function (f, a, h) {
            var d, g = 0, c = f.length, b = cZ(f);
            if (h) {
                if (b) {
                    for (;
                        g < c; g++) {
                        d = a.apply(f[g], h);
                        if (d === false) {
                            break
                        }
                    }
                } else {
                    for (g in f) {
                        d = a.apply(f[g], h);
                        if (d === false) {
                            break
                        }
                    }
                }
            } else {
                if (b) {
                    for (; g < c; g++) {
                        d = a.call(f[g], g, f[g]);
                        if (d === false) {
                            break
                        }
                    }
                } else {
                    for (g in f) {
                        d = a.call(f[g], g, f[g]);
                        if (d === false) {
                            break
                        }
                    }
                }
            }
            return f
        }, trim: function (a) {
            return a == null ? "" : (a + "").replace(cJ, "")
        }, makeArray: function (b, c) {
            var a = c || [];
            if (b != null) {
                if (cZ(Object(b))) {
                    ee.merge(a, typeof b === "string" ? [b] : b)
                } else {
                    cw.call(a, b)
                }
            }
            return a
        }, inArray: function (b, d, c) {
            var a;
            if (d) {
                if (cL) {
                    return cL.call(d, b, c)
                }
                a = d.length;
                c = c ? c < 0 ? Math.max(0, a + c) : c : 0;
                for (; c < a; c++) {
                    if (c in d && d[c] === b) {
                        return c
                    }
                }
            }
            return -1
        }, merge: function (a, d) {
            var c = +d.length, f = 0, b = a.length;
            while (f < c) {
                a[b++] = d[f++]
            }
            if (c !== c) {
                while (d[f] !== undefined) {
                    a[b++] = d[f++]
                }
            }
            a.length = b;
            return a
        }, grep: function (g, f, a) {
            var d, c = [], j = 0, h = g.length, b = !a;
            for (;
                j < h; j++) {
                d = !f(g[j], j);
                if (d !== b) {
                    c.push(g[j])
                }
            }
            return c
        }, map: function (h, g, f) {
            var d, a = 0, b = h.length, j = cZ(h), c = [];
            if (j) {
                for (; a < b; a++) {
                    d = g(h[a], a, f);
                    if (d != null) {
                        c.push(d)
                    }
                }
            } else {
                for (a in h) {
                    d = g(h[a], a, f);
                    if (d != null) {
                        c.push(d)
                    }
                }
            }
            return dy.apply([], c)
        }, guid: 1, proxy: function (c, d) {
            var b, f, a;
            if (typeof d === "string") {
                a = c[d];
                d = c;
                c = a
            }
            if (!ee.isFunction(c)) {
                return undefined
            }
            b = c4.call(arguments, 2);
            f = function () {
                return c.apply(d || this, b.concat(c4.call(arguments)))
            };
            f.guid = c.guid = c.guid || ee.guid++;
            return f
        }, now: function () {
            return +(new Date())
        }, support: cN
    });
    ee.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (b, a) {
        dt["[object " + a + "]"] = a.toLowerCase()
    });
    function cZ(c) {
        var a = "length" in c && c.length, b = ee.type(c);
        if (b === "function" || ee.isWindow(c)) {
            return false
        }
        if (c.nodeType === 1 && a) {
            return true
        }
        return b === "array" || a === 0 || typeof a === "number" && a > 0 && (a - 1) in c
    }

    var ct =
        /*!
         * Sizzle CSS Selector Engine v2.2.0-pre
         * http://sizzlejs.com/
         *
         * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2014-12-16
         */
        (function (V) {
            var ag, Q, m, ay, D, g, G, R, aB, ax, F, av, W, an, ak, t, T, ap, O, aa = "sizzle" + 1 * new Date(),
                E = V.document, P = 0, r = 0, v = ad(), ac = ad(), N = ad(), S = function (aE, aF) {
                    if (aE === aF) {
                        F = true
                    }
                    return 0
                }, az = 1 << 31, z = ({}).hasOwnProperty, Z = [], X = Z.pop, B = Z.push, x = Z.push, o = Z.slice,
                aq = function (aH, aE) {
                    var aF = 0, aG = aH.length;
                    for (; aF < aG; aF++) {
                        if (aH[aF] === aE) {
                            return aF
                        }
                    }
                    return -1
                },
                w = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                am = "[\\x20\\t\\r\\n\\f]", y = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", C = y.replace("w", "w#"),
                n = "\\[" + am + "*(" + y + ")(?:" + am + "*([*^$|!~]?=)" + am + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + C + "))|)" + am + "*\\]",
                s = ":(" + y + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + n + ")*)|.*)\\)|)",
                a = new RegExp(am + "+", "g"),
                d = new RegExp("^" + am + "+|((?:^|[^\\\\])(?:\\\\.)*)" + am + "+$", "g"),
                ae = new RegExp("^" + am + "*," + am + "*"),
                Y = new RegExp("^" + am + "*([>+~]|" + am + ")" + am + "*"),
                b = new RegExp("=" + am + "*([^\\]'\"]*?)" + am + "*\\]", "g"), K = new RegExp(s),
                I = new RegExp("^" + C + "$"), f = {
                    ID: new RegExp("^#(" + y + ")"),
                    CLASS: new RegExp("^\\.(" + y + ")"),
                    TAG: new RegExp("^(" + y.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + n),
                    PSEUDO: new RegExp("^" + s),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + am + "*(even|odd|(([+-]|)(\\d*)n|)" + am + "*(?:([+-]|)" + am + "*(\\d+)|))" + am + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + w + ")$", "i"),
                    needsContext: new RegExp("^" + am + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + am + "*((?:-\\d)?\\d*)" + am + "*\\)|)(?=[^-]|$)", "i")
                }, ar = /^(?:input|select|textarea|button)$/i, q = /^h\d$/i, aA = /^[^{]+\{\s*\[native \w/,
                L = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, h = /[+~]/, A = /'|\\/g,
                c = new RegExp("\\\\([\\da-f]{1,6}" + am + "?|(" + am + ")|.)", "ig"), p = function (aH, aE, aG) {
                    var aF = "0x" + aE - 65536;
                    return aF !== aF || aG ? aE : aF < 0 ? String.fromCharCode(aF + 65536) : String.fromCharCode(aF >> 10 | 55296, aF & 1023 | 56320)
                }, aC = function () {
                    av()
                };
            try {
                x.apply((Z = o.call(E.childNodes)), E.childNodes);
                Z[E.childNodes.length].nodeType
            } catch (U) {
                x = {
                    apply: Z.length ? function (aE, aF) {
                        B.apply(aE, o.call(aF))
                    } : function (aH, aE) {
                        var aG = aH.length, aF = 0;
                        while ((aH[aG++] = aE[aF++])) {
                        }
                        aH.length = aG - 1
                    }
                }
            }
            function ai(aS, aL, aO, aJ) {
                var aN, aG, aF, aQ, aP, aH, aI, aM, aK, aR;
                if ((aL ? aL.ownerDocument || aL : E) !== W) {
                    av(aL)
                }
                aL = aL || W;
                aO = aO || [];
                aQ = aL.nodeType;
                if (typeof aS !== "string" || !aS || aQ !== 1 && aQ !== 9 && aQ !== 11) {
                    return aO
                }
                if (!aJ && ak) {
                    if (aQ !== 11 && (aN = L.exec(aS))) {
                        if ((aF = aN[1])) {
                            if (aQ === 9) {
                                aG = aL.getElementById(aF);
                                if (aG && aG.parentNode) {
                                    if (aG.id === aF) {
                                        aO.push(aG);
                                        return aO
                                    }
                                } else {
                                    return aO
                                }
                            } else {
                                if (aL.ownerDocument && (aG = aL.ownerDocument.getElementById(aF)) && O(aL, aG) && aG.id === aF) {
                                    aO.push(aG);
                                    return aO
                                }
                            }
                        } else {
                            if (aN[2]) {
                                x.apply(aO, aL.getElementsByTagName(aS));
                                return aO
                            } else {
                                if ((aF = aN[3]) && Q.getElementsByClassName) {
                                    x.apply(aO, aL.getElementsByClassName(aF));
                                    return aO
                                }
                            }
                        }
                    }
                    if (Q.qsa && (!t || !t.test(aS))) {
                        aM = aI = aa;
                        aK = aL;
                        aR = aQ !== 1 && aS;
                        if (aQ === 1 && aL.nodeName.toLowerCase() !== "object") {
                            aH = g(aS);
                            if ((aI = aL.getAttribute("id"))) {
                                aM = aI.replace(A, "\\$&")
                            } else {
                                aL.setAttribute("id", aM)
                            }
                            aM = "[id='" + aM + "'] ";
                            aP = aH.length;
                            while (aP--) {
                                aH[aP] = aM + j(aH[aP])
                            }
                            aK = h.test(aS) && J(aL.parentNode) || aL;
                            aR = aH.join(",")
                        }
                        if (aR) {
                            try {
                                x.apply(aO, aK.querySelectorAll(aR));
                                return aO
                            } catch (aE) {
                            } finally {
                                if (!aI) {
                                    aL.removeAttribute("id")
                                }
                            }
                        }
                    }
                }
                return R(aS.replace(d, "$1"), aL, aO, aJ)
            }

            function ad() {
                var aE = [];

                function aF(aH, aG) {
                    if (aE.push(aH + " ") > m.cacheLength) {
                        delete aF[aE.shift()]
                    }
                    return (aF[aH + " "] = aG)
                }

                return aF
            }

            function u(aE) {
                aE[aa] = true;
                return aE
            }

            function ao(aG) {
                var aE = W.createElement("div");
                try {
                    return !!aG(aE)
                } catch (aF) {
                    return false
                } finally {
                    if (aE.parentNode) {
                        aE.parentNode.removeChild(aE)
                    }
                    aE = null
                }
            }

            function M(aF, aH) {
                var aG = aF.split("|"), aE = aF.length;
                while (aE--) {
                    m.attrHandle[aG[aE]] = aH
                }
            }

            function k(aG, aH) {
                var aE = aH && aG,
                    aF = aE && aG.nodeType === 1 && aH.nodeType === 1 && (~aH.sourceIndex || az) - (~aG.sourceIndex || az);
                if (aF) {
                    return aF
                }
                if (aE) {
                    while ((aE = aE.nextSibling)) {
                        if (aE === aH) {
                            return -1
                        }
                    }
                }
                return aG ? 1 : -1
            }

            function ah(aE) {
                return function (aF) {
                    var aG = aF.nodeName.toLowerCase();
                    return aG === "input" && aF.type === aE
                }
            }

            function at(aE) {
                return function (aF) {
                    var aG = aF.nodeName.toLowerCase();
                    return (aG === "input" || aG === "button") && aF.type === aE
                }
            }

            function al(aE) {
                return u(function (aF) {
                    aF = +aF;
                    return u(function (aH, aI) {
                        var aK, aG = aE([], aH.length, aF), aJ = aG.length;
                        while (aJ--) {
                            if (aH[(aK = aG[aJ])]) {
                                aH[aK] = !(aI[aK] = aH[aK])
                            }
                        }
                    })
                })
            }

            function J(aE) {
                return aE && typeof aE.getElementsByTagName !== "undefined" && aE
            }

            Q = ai.support = {};
            D = ai.isXML = function (aF) {
                var aE = aF && (aF.ownerDocument || aF).documentElement;
                return aE ? aE.nodeName !== "HTML" : false
            };
            av = ai.setDocument = function (aF) {
                var aH, aG, aE = aF ? aF.ownerDocument || aF : E;
                if (aE === W || aE.nodeType !== 9 || !aE.documentElement) {
                    return W
                }
                W = aE;
                an = aE.documentElement;
                aG = aE.defaultView;
                if (aG && aG !== aG.top) {
                    if (aG.addEventListener) {
                        aG.addEventListener("unload", aC, false)
                    } else {
                        if (aG.attachEvent) {
                            aG.attachEvent("onunload", aC)
                        }
                    }
                }
                ak = !D(aE);
                Q.attributes = ao(function (aI) {
                    aI.className = "i";
                    return !aI.getAttribute("className")
                });
                Q.getElementsByTagName = ao(function (aI) {
                    aI.appendChild(aE.createComment(""));
                    return !aI.getElementsByTagName("*").length
                });
                Q.getElementsByClassName = aA.test(aE.getElementsByClassName);
                Q.getById = ao(function (aI) {
                    an.appendChild(aI).id = aa;
                    return !aE.getElementsByName || !aE.getElementsByName(aa).length
                });
                if (Q.getById) {
                    m.find.ID = function (aI, aJ) {
                        if (typeof aJ.getElementById !== "undefined" && ak) {
                            var aK = aJ.getElementById(aI);
                            return aK && aK.parentNode ? [aK] : []
                        }
                    };
                    m.filter.ID = function (aI) {
                        var aJ = aI.replace(c, p);
                        return function (aK) {
                            return aK.getAttribute("id") === aJ
                        }
                    }
                } else {
                    delete m.find.ID;
                    m.filter.ID = function (aI) {
                        var aJ = aI.replace(c, p);
                        return function (aK) {
                            var aL = typeof aK.getAttributeNode !== "undefined" && aK.getAttributeNode("id");
                            return aL && aL.value === aJ
                        }
                    }
                }
                m.find.TAG = Q.getElementsByTagName ? function (aJ, aI) {
                    if (typeof aI.getElementsByTagName !== "undefined") {
                        return aI.getElementsByTagName(aJ)
                    } else {
                        if (Q.qsa) {
                            return aI.querySelectorAll(aJ)
                        }
                    }
                } : function (aN, aJ) {
                    var aI, aK = [], aL = 0, aM = aJ.getElementsByTagName(aN);
                    if (aN === "*") {
                        while ((aI = aM[aL++])) {
                            if (aI.nodeType === 1) {
                                aK.push(aI)
                            }
                        }
                        return aK
                    }
                    return aM
                };
                m.find.CLASS = Q.getElementsByClassName && function (aI, aJ) {
                        if (ak) {
                            return aJ.getElementsByClassName(aI)
                        }
                    };
                T = [];
                t = [];
                if ((Q.qsa = aA.test(aE.querySelectorAll))) {
                    ao(function (aI) {
                        an.appendChild(aI).innerHTML = "<a id='" + aa + "'></a><select id='" + aa + "-\f]' msallowcapture=''><option selected=''></option></select>";
                        if (aI.querySelectorAll("[msallowcapture^='']").length) {
                            t.push("[*^$]=" + am + "*(?:''|\"\")")
                        }
                        if (!aI.querySelectorAll("[selected]").length) {
                            t.push("\\[" + am + "*(?:value|" + w + ")")
                        }
                        if (!aI.querySelectorAll("[id~=" + aa + "-]").length) {
                            t.push("~=")
                        }
                        if (!aI.querySelectorAll(":checked").length) {
                            t.push(":checked")
                        }
                        if (!aI.querySelectorAll("a#" + aa + "+*").length) {
                            t.push(".#.+[+~]")
                        }
                    });
                    ao(function (aI) {
                        var aJ = aE.createElement("input");
                        aJ.setAttribute("type", "hidden");
                        aI.appendChild(aJ).setAttribute("name", "D");
                        if (aI.querySelectorAll("[name=d]").length) {
                            t.push("name" + am + "*[*^$|!~]?=")
                        }
                        if (!aI.querySelectorAll(":enabled").length) {
                            t.push(":enabled", ":disabled")
                        }
                        aI.querySelectorAll("*,:x");
                        t.push(",.*:")
                    })
                }
                if ((Q.matchesSelector = aA.test((ap = an.matches || an.webkitMatchesSelector || an.mozMatchesSelector || an.oMatchesSelector || an.msMatchesSelector)))) {
                    ao(function (aI) {
                        Q.disconnectedMatch = ap.call(aI, "div");
                        ap.call(aI, "[s!='']:x");
                        T.push("!=", s)
                    })
                }
                t = t.length && new RegExp(t.join("|"));
                T = T.length && new RegExp(T.join("|"));
                aH = aA.test(an.compareDocumentPosition);
                O = aH || aA.test(an.contains) ? function (aK, aL) {
                    var aI = aK.nodeType === 9 ? aK.documentElement : aK, aJ = aL && aL.parentNode;
                    return aK === aJ || !!(aJ && aJ.nodeType === 1 && (aI.contains ? aI.contains(aJ) : aK.compareDocumentPosition && aK.compareDocumentPosition(aJ) & 16))
                } : function (aI, aJ) {
                    if (aJ) {
                        while ((aJ = aJ.parentNode)) {
                            if (aJ === aI) {
                                return true
                            }
                        }
                    }
                    return false
                };
                S = aH ? function (aJ, aK) {
                    if (aJ === aK) {
                        F = true;
                        return 0
                    }
                    var aI = !aJ.compareDocumentPosition - !aK.compareDocumentPosition;
                    if (aI) {
                        return aI
                    }
                    aI = (aJ.ownerDocument || aJ) === (aK.ownerDocument || aK) ? aJ.compareDocumentPosition(aK) : 1;
                    if (aI & 1 || (!Q.sortDetached && aK.compareDocumentPosition(aJ) === aI)) {
                        if (aJ === aE || aJ.ownerDocument === E && O(E, aJ)) {
                            return -1
                        }
                        if (aK === aE || aK.ownerDocument === E && O(E, aK)) {
                            return 1
                        }
                        return ax ? (aq(ax, aJ) - aq(ax, aK)) : 0
                    }
                    return aI & 4 ? -1 : 1
                } : function (aO, aP) {
                    if (aO === aP) {
                        F = true;
                        return 0
                    }
                    var aI, aL = 0, aJ = aO.parentNode, aM = aP.parentNode, aN = [aO], aK = [aP];
                    if (!aJ || !aM) {
                        return aO === aE ? -1 : aP === aE ? 1 : aJ ? -1 : aM ? 1 : ax ? (aq(ax, aO) - aq(ax, aP)) : 0
                    } else {
                        if (aJ === aM) {
                            return k(aO, aP)
                        }
                    }
                    aI = aO;
                    while ((aI = aI.parentNode)) {
                        aN.unshift(aI)
                    }
                    aI = aP;
                    while ((aI = aI.parentNode)) {
                        aK.unshift(aI)
                    }
                    while (aN[aL] === aK[aL]) {
                        aL++
                    }
                    return aL ? k(aN[aL], aK[aL]) : aN[aL] === E ? -1 : aK[aL] === E ? 1 : 0
                };
                return aE
            };
            ai.matches = function (aE, aF) {
                return ai(aE, null, null, aF)
            };
            ai.matchesSelector = function (aF, aH) {
                if ((aF.ownerDocument || aF) !== W) {
                    av(aF)
                }
                aH = aH.replace(b, "='$1']");
                if (Q.matchesSelector && ak && (!T || !T.test(aH)) && (!t || !t.test(aH))) {
                    try {
                        var aG = ap.call(aF, aH);
                        if (aG || Q.disconnectedMatch || aF.document && aF.document.nodeType !== 11) {
                            return aG
                        }
                    } catch (aE) {
                    }
                }
                return ai(aH, W, null, [aF]).length > 0
            };
            ai.contains = function (aF, aE) {
                if ((aF.ownerDocument || aF) !== W) {
                    av(aF)
                }
                return O(aF, aE)
            };
            ai.attr = function (aF, aH) {
                if ((aF.ownerDocument || aF) !== W) {
                    av(aF)
                }
                var aG = m.attrHandle[aH.toLowerCase()],
                    aE = aG && z.call(m.attrHandle, aH.toLowerCase()) ? aG(aF, aH, !ak) : undefined;
                return aE !== undefined ? aE : Q.attributes || !ak ? aF.getAttribute(aH) : (aE = aF.getAttributeNode(aH)) && aE.specified ? aE.value : null
            };
            ai.error = function (aE) {
                throw new Error("Syntax error, unrecognized expression: " + aE)
            };
            ai.uniqueSort = function (aE) {
                var aI, aH = [], aG = 0, aF = 0;
                F = !Q.detectDuplicates;
                ax = !Q.sortStable && aE.slice(0);
                aE.sort(S);
                if (F) {
                    while ((aI = aE[aF++])) {
                        if (aI === aE[aF]) {
                            aG = aH.push(aF)
                        }
                    }
                    while (aG--) {
                        aE.splice(aH[aG], 1)
                    }
                }
                ax = null;
                return aE
            };
            ay = ai.getText = function (aH) {
                var aI, aF = "", aE = 0, aG = aH.nodeType;
                if (!aG) {
                    while ((aI = aH[aE++])) {
                        aF += ay(aI)
                    }
                } else {
                    if (aG === 1 || aG === 9 || aG === 11) {
                        if (typeof aH.textContent === "string") {
                            return aH.textContent
                        } else {
                            for (aH = aH.firstChild; aH; aH = aH.nextSibling) {
                                aF += ay(aH)
                            }
                        }
                    } else {
                        if (aG === 3 || aG === 4) {
                            return aH.nodeValue
                        }
                    }
                }
                return aF
            };
            m = ai.selectors = {
                cacheLength: 50,
                createPseudo: u,
                match: f,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {dir: "parentNode", first: true},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: true},
                    "~": {dir: "previousSibling"}
                },
                preFilter: {
                    ATTR: function (aE) {
                        aE[1] = aE[1].replace(c, p);
                        aE[3] = (aE[3] || aE[4] || aE[5] || "").replace(c, p);
                        if (aE[2] === "~=") {
                            aE[3] = " " + aE[3] + " "
                        }
                        return aE.slice(0, 4)
                    }, CHILD: function (aE) {
                        aE[1] = aE[1].toLowerCase();
                        if (aE[1].slice(0, 3) === "nth") {
                            if (!aE[3]) {
                                ai.error(aE[0])
                            }
                            aE[4] = +(aE[4] ? aE[5] + (aE[6] || 1) : 2 * (aE[3] === "even" || aE[3] === "odd"));
                            aE[5] = +((aE[7] + aE[8]) || aE[3] === "odd")
                        } else {
                            if (aE[3]) {
                                ai.error(aE[0])
                            }
                        }
                        return aE
                    }, PSEUDO: function (aF) {
                        var aG, aE = !aF[6] && aF[2];
                        if (f.CHILD.test(aF[0])) {
                            return null
                        }
                        if (aF[3]) {
                            aF[2] = aF[4] || aF[5] || ""
                        } else {
                            if (aE && K.test(aE) && (aG = g(aE, true)) && (aG = aE.indexOf(")", aE.length - aG) - aE.length)) {
                                aF[0] = aF[0].slice(0, aG);
                                aF[2] = aE.slice(0, aG)
                            }
                        }
                        return aF.slice(0, 3)
                    }
                },
                filter: {
                    TAG: function (aE) {
                        var aF = aE.replace(c, p).toLowerCase();
                        return aE === "*" ? function () {
                            return true
                        } : function (aG) {
                            return aG.nodeName && aG.nodeName.toLowerCase() === aF
                        }
                    }, CLASS: function (aF) {
                        var aE = v[aF + " "];
                        return aE || (aE = new RegExp("(^|" + am + ")" + aF + "(" + am + "|$)")) && v(aF, function (aG) {
                                return aE.test(typeof aG.className === "string" && aG.className || typeof aG.getAttribute !== "undefined" && aG.getAttribute("class") || "")
                            })
                    }, ATTR: function (aE, aF, aG) {
                        return function (aI) {
                            var aH = ai.attr(aI, aE);
                            if (aH == null) {
                                return aF === "!="
                            }
                            if (!aF) {
                                return true
                            }
                            aH += "";
                            return aF === "=" ? aH === aG : aF === "!=" ? aH !== aG : aF === "^=" ? aG && aH.indexOf(aG) === 0 : aF === "*=" ? aG && aH.indexOf(aG) > -1 : aF === "$=" ? aG && aH.slice(-aG.length) === aG : aF === "~=" ? (" " + aH.replace(a, " ") + " ").indexOf(aG) > -1 : aF === "|=" ? aH === aG || aH.slice(0, aG.length + 1) === aG + "-" : false
                        }
                    }, CHILD: function (aG, aL, aE, aK, aF) {
                        var aH = aG.slice(0, 3) !== "nth", aJ = aG.slice(-4) !== "last", aI = aL === "of-type";
                        return aK === 1 && aF === 0 ? function (aM) {
                            return !!aM.parentNode
                        } : function (aR, aU, aO) {
                            var aY, aX, aP, aM, aQ, aT, aS = aH !== aJ ? "nextSibling" : "previousSibling",
                                aN = aR.parentNode, aV = aI && aR.nodeName.toLowerCase(), aW = !aO && !aI;
                            if (aN) {
                                if (aH) {
                                    while (aS) {
                                        aP = aR;
                                        while ((aP = aP[aS])) {
                                            if (aI ? aP.nodeName.toLowerCase() === aV : aP.nodeType === 1) {
                                                return false
                                            }
                                        }
                                        aT = aS = aG === "only" && !aT && "nextSibling"
                                    }
                                    return true
                                }
                                aT = [aJ ? aN.firstChild : aN.lastChild];
                                if (aJ && aW) {
                                    aX = aN[aa] || (aN[aa] = {});
                                    aY = aX[aG] || [];
                                    aQ = aY[0] === P && aY[1];
                                    aM = aY[0] === P && aY[2];
                                    aP = aQ && aN.childNodes[aQ];
                                    while ((aP = ++aQ && aP && aP[aS] || (aM = aQ = 0) || aT.pop())) {
                                        if (aP.nodeType === 1 && ++aM && aP === aR) {
                                            aX[aG] = [P, aQ, aM];
                                            break
                                        }
                                    }
                                } else {
                                    if (aW && (aY = (aR[aa] || (aR[aa] = {}))[aG]) && aY[0] === P) {
                                        aM = aY[1]
                                    } else {
                                        while ((aP = ++aQ && aP && aP[aS] || (aM = aQ = 0) || aT.pop())) {
                                            if ((aI ? aP.nodeName.toLowerCase() === aV : aP.nodeType === 1) && ++aM) {
                                                if (aW) {
                                                    (aP[aa] || (aP[aa] = {}))[aG] = [P, aM]
                                                }
                                                if (aP === aR) {
                                                    break
                                                }
                                            }
                                        }
                                    }
                                }
                                aM -= aF;
                                return aM === aK || (aM % aK === 0 && aM / aK >= 0)
                            }
                        }
                    }, PSEUDO: function (aE, aF) {
                        var aH,
                            aG = m.pseudos[aE] || m.setFilters[aE.toLowerCase()] || ai.error("unsupported pseudo: " + aE);
                        if (aG[aa]) {
                            return aG(aF)
                        }
                        if (aG.length > 1) {
                            aH = [aE, aE, "", aF];
                            return m.setFilters.hasOwnProperty(aE.toLowerCase()) ? u(function (aK, aI) {
                                var aL, aM = aG(aK, aF), aJ = aM.length;
                                while (aJ--) {
                                    aL = aq(aK, aM[aJ]);
                                    aK[aL] = !(aI[aL] = aM[aJ])
                                }
                            }) : function (aI) {
                                return aG(aI, 0, aH)
                            }
                        }
                        return aG
                    }
                },
                pseudos: {
                    not: u(function (aH) {
                        var aG = [], aF = [], aE = G(aH.replace(d, "$1"));
                        return aE[aa] ? u(function (aN, aI, aK, aM) {
                            var aJ, aO = aE(aN, null, aM, []), aL = aN.length;
                            while (aL--) {
                                if ((aJ = aO[aL])) {
                                    aN[aL] = !(aI[aL] = aJ)
                                }
                            }
                        }) : function (aI, aJ, aK) {
                            aG[0] = aI;
                            aE(aG, null, aK, aF);
                            aG[0] = null;
                            return !aF.pop()
                        }
                    }), has: u(function (aE) {
                        return function (aF) {
                            return ai(aE, aF).length > 0
                        }
                    }), contains: u(function (aE) {
                        aE = aE.replace(c, p);
                        return function (aF) {
                            return (aF.textContent || aF.innerText || ay(aF)).indexOf(aE) > -1
                        }
                    }), lang: u(function (aE) {
                        if (!I.test(aE || "")) {
                            ai.error("unsupported lang: " + aE)
                        }
                        aE = aE.replace(c, p).toLowerCase();
                        return function (aF) {
                            var aG;
                            do {
                                if ((aG = ak ? aF.lang : aF.getAttribute("xml:lang") || aF.getAttribute("lang"))) {
                                    aG = aG.toLowerCase();
                                    return aG === aE || aG.indexOf(aE + "-") === 0
                                }
                            } while ((aF = aF.parentNode) && aF.nodeType === 1);
                            return false
                        }
                    }), target: function (aF) {
                        var aE = V.location && V.location.hash;
                        return aE && aE.slice(1) === aF.id
                    }, root: function (aE) {
                        return aE === an
                    }, focus: function (aE) {
                        return aE === W.activeElement && (!W.hasFocus || W.hasFocus()) && !!(aE.type || aE.href || ~aE.tabIndex)
                    }, enabled: function (aE) {
                        return aE.disabled === false
                    }, disabled: function (aE) {
                        return aE.disabled === true
                    }, checked: function (aF) {
                        var aE = aF.nodeName.toLowerCase();
                        return (aE === "input" && !!aF.checked) || (aE === "option" && !!aF.selected)
                    }, selected: function (aE) {
                        if (aE.parentNode) {
                            aE.parentNode.selectedIndex
                        }
                        return aE.selected === true
                    }, empty: function (aE) {
                        for (aE = aE.firstChild; aE; aE = aE.nextSibling) {
                            if (aE.nodeType < 6) {
                                return false
                            }
                        }
                        return true
                    }, parent: function (aE) {
                        return !m.pseudos.empty(aE)
                    }, header: function (aE) {
                        return q.test(aE.nodeName)
                    }, input: function (aE) {
                        return ar.test(aE.nodeName)
                    }, button: function (aE) {
                        var aF = aE.nodeName.toLowerCase();
                        return aF === "input" && aE.type === "button" || aF === "button"
                    }, text: function (aE) {
                        var aF;
                        return aE.nodeName.toLowerCase() === "input" && aE.type === "text" && ((aF = aE.getAttribute("type")) == null || aF.toLowerCase() === "text")
                    }, first: al(function () {
                        return [0]
                    }), last: al(function (aF, aE) {
                        return [aE - 1]
                    }), eq: al(function (aG, aE, aF) {
                        return [aF < 0 ? aF + aE : aF]
                    }), even: al(function (aG, aE) {
                        var aF = 0;
                        for (; aF < aE; aF += 2) {
                            aG.push(aF)
                        }
                        return aG
                    }), odd: al(function (aG, aE) {
                        var aF = 1;
                        for (; aF < aE; aF += 2) {
                            aG.push(aF)
                        }
                        return aG
                    }), lt: al(function (aG, aH, aE) {
                        var aF = aE < 0 ? aE + aH : aE;
                        for (; --aF >= 0;) {
                            aG.push(aF)
                        }
                        return aG
                    }), gt: al(function (aG, aH, aE) {
                        var aF = aE < 0 ? aE + aH : aE;
                        for (; ++aF < aH;) {
                            aG.push(aF)
                        }
                        return aG
                    })
                }
            };
            m.pseudos.nth = m.pseudos.eq;
            for (ag in {radio: true, checkbox: true, file: true, password: true, image: true}) {
                m.pseudos[ag] = ah(ag)
            }
            for (ag in {submit: true, reset: true}) {
                m.pseudos[ag] = at(ag)
            }
            function H() {
            }

            H.prototype = m.filters = m.pseudos;
            m.setFilters = new H();
            g = ai.tokenize = function (aH, aM) {
                var aJ, aG, aE, aN, aF, aK, aL, aI = ac[aH + " "];
                if (aI) {
                    return aM ? 0 : aI.slice(0)
                }
                aF = aH;
                aK = [];
                aL = m.preFilter;
                while (aF) {
                    if (!aJ || (aG = ae.exec(aF))) {
                        if (aG) {
                            aF = aF.slice(aG[0].length) || aF
                        }
                        aK.push((aE = []))
                    }
                    aJ = false;
                    if ((aG = Y.exec(aF))) {
                        aJ = aG.shift();
                        aE.push({value: aJ, type: aG[0].replace(d, " ")});
                        aF = aF.slice(aJ.length)
                    }
                    for (aN in m.filter) {
                        if ((aG = f[aN].exec(aF)) && (!aL[aN] || (aG = aL[aN](aG)))) {
                            aJ = aG.shift();
                            aE.push({value: aJ, type: aN, matches: aG});
                            aF = aF.slice(aJ.length)
                        }
                    }
                    if (!aJ) {
                        break
                    }
                }
                return aM ? aF.length : aF ? ai.error(aH) : ac(aH, aK).slice(0)
            };
            function j(aH) {
                var aE = 0, aF = aH.length, aG = "";
                for (; aE < aF; aE++) {
                    aG += aH[aE].value
                }
                return aG
            }

            function aj(aJ, aF, aE) {
                var aH = aF.dir, aI = aE && aH === "parentNode", aG = r++;
                return aF.first ? function (aK, aL, aM) {
                    while ((aK = aK[aH])) {
                        if (aK.nodeType === 1 || aI) {
                            return aJ(aK, aL, aM)
                        }
                    }
                } : function (aL, aN, aO) {
                    var aK, aM, aP = [P, aG];
                    if (aO) {
                        while ((aL = aL[aH])) {
                            if (aL.nodeType === 1 || aI) {
                                if (aJ(aL, aN, aO)) {
                                    return true
                                }
                            }
                        }
                    } else {
                        while ((aL = aL[aH])) {
                            if (aL.nodeType === 1 || aI) {
                                aM = aL[aa] || (aL[aa] = {});
                                if ((aK = aM[aH]) && aK[0] === P && aK[1] === aG) {
                                    return (aP[2] = aK[2])
                                } else {
                                    aM[aH] = aP;
                                    if ((aP[2] = aJ(aL, aN, aO))) {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }

            function aD(aE) {
                return aE.length > 1 ? function (aH, aI, aG) {
                    var aF = aE.length;
                    while (aF--) {
                        if (!aE[aF](aH, aI, aG)) {
                            return false
                        }
                    }
                    return true
                } : aE[0]
            }

            function af(aF, aH, aI) {
                var aE = 0, aG = aH.length;
                for (; aE < aG; aE++) {
                    ai(aF, aH[aE], aI)
                }
                return aI
            }

            function au(aL, aK, aJ, aI, aF) {
                var aH, aM = [], aG = 0, aE = aL.length, aN = aK != null;
                for (; aG < aE; aG++) {
                    if ((aH = aL[aG])) {
                        if (!aJ || aJ(aH, aI, aF)) {
                            aM.push(aH);
                            if (aN) {
                                aK.push(aG)
                            }
                        }
                    }
                }
                return aM
            }

            function l(aF, aG, aJ, aE, aI, aH) {
                if (aE && !aE[aa]) {
                    aE = l(aE)
                }
                if (aI && !aI[aa]) {
                    aI = l(aI, aH)
                }
                return u(function (aR, aU, aM, aS) {
                    var aQ, aT, aK, aL = [], aP = [], aN = aU.length,
                        aO = aR || af(aG || "*", aM.nodeType ? [aM] : aM, []),
                        aW = aF && (aR || !aG) ? au(aO, aL, aF, aM, aS) : aO,
                        aV = aJ ? aI || (aR ? aF : aN || aE) ? [] : aU : aW;
                    if (aJ) {
                        aJ(aW, aV, aM, aS)
                    }
                    if (aE) {
                        aQ = au(aV, aP);
                        aE(aQ, [], aM, aS);
                        aT = aQ.length;
                        while (aT--) {
                            if ((aK = aQ[aT])) {
                                aV[aP[aT]] = !(aW[aP[aT]] = aK)
                            }
                        }
                    }
                    if (aR) {
                        if (aI || aF) {
                            if (aI) {
                                aQ = [];
                                aT = aV.length;
                                while (aT--) {
                                    if ((aK = aV[aT])) {
                                        aQ.push((aW[aT] = aK))
                                    }
                                }
                                aI(null, (aV = []), aQ, aS)
                            }
                            aT = aV.length;
                            while (aT--) {
                                if ((aK = aV[aT]) && (aQ = aI ? aq(aR, aK) : aL[aT]) > -1) {
                                    aR[aQ] = !(aU[aQ] = aK)
                                }
                            }
                        }
                    } else {
                        aV = au(aV === aU ? aV.splice(aN, aV.length) : aV);
                        if (aI) {
                            aI(null, aU, aV, aS)
                        } else {
                            x.apply(aU, aV)
                        }
                    }
                })
            }

            function ab(aH) {
                var aM, aJ, aL, aI = aH.length, aE = m.relative[aH[0].type], aO = aE || m.relative[" "],
                    aK = aE ? 1 : 0, aG = aj(function (aP) {
                        return aP === aM
                    }, aO, true), aF = aj(function (aP) {
                        return aq(aM, aP) > -1
                    }, aO, true), aN = [function (aP, aQ, aR) {
                        var aS = (!aE && (aR || aQ !== aB)) || ((aM = aQ).nodeType ? aG(aP, aQ, aR) : aF(aP, aQ, aR));
                        aM = null;
                        return aS
                    }];
                for (; aK < aI; aK++) {
                    if ((aJ = m.relative[aH[aK].type])) {
                        aN = [aj(aD(aN), aJ)]
                    } else {
                        aJ = m.filter[aH[aK].type].apply(null, aH[aK].matches);
                        if (aJ[aa]) {
                            aL = ++aK;
                            for (; aL < aI; aL++) {
                                if (m.relative[aH[aL].type]) {
                                    break
                                }
                            }
                            return l(aK > 1 && aD(aN), aK > 1 && j(aH.slice(0, aK - 1).concat({value: aH[aK - 2].type === " " ? "*" : ""})).replace(d, "$1"), aJ, aK < aL && ab(aH.slice(aK, aL)), aL < aI && ab((aH = aH.slice(aL))), aL < aI && j(aH))
                        }
                        aN.push(aJ)
                    }
                }
                return aD(aN)
            }

            function aw(aE, aF) {
                var aH = aF.length > 0, aI = aE.length > 0, aG = function (aT, aJ, aV, aX, aS) {
                    var aU, aR, aP, aL = 0, aY = "0", aQ = aT && [], aW = [], aO = aB,
                        aK = aT || aI && m.find.TAG("*", aS), aN = (P += aO == null ? 1 : Math.random() || 0.1),
                        aM = aK.length;
                    if (aS) {
                        aB = aJ !== W && aJ
                    }
                    for (; aY !== aM && (aU = aK[aY]) != null; aY++) {
                        if (aI && aU) {
                            aR = 0;
                            while ((aP = aE[aR++])) {
                                if (aP(aU, aJ, aV)) {
                                    aX.push(aU);
                                    break
                                }
                            }
                            if (aS) {
                                P = aN
                            }
                        }
                        if (aH) {
                            if ((aU = !aP && aU)) {
                                aL--
                            }
                            if (aT) {
                                aQ.push(aU)
                            }
                        }
                    }
                    aL += aY;
                    if (aH && aY !== aL) {
                        aR = 0;
                        while ((aP = aF[aR++])) {
                            aP(aQ, aW, aJ, aV)
                        }
                        if (aT) {
                            if (aL > 0) {
                                while (aY--) {
                                    if (!(aQ[aY] || aW[aY])) {
                                        aW[aY] = X.call(aX)
                                    }
                                }
                            }
                            aW = au(aW)
                        }
                        x.apply(aX, aW);
                        if (aS && !aT && aW.length > 0 && (aL + aF.length) > 1) {
                            ai.uniqueSort(aX)
                        }
                    }
                    if (aS) {
                        P = aN;
                        aB = aO
                    }
                    return aQ
                };
                return aH ? u(aG) : aG
            }

            G = ai.compile = function (aH, aE) {
                var aJ, aF = [], aG = [], aI = N[aH + " "];
                if (!aI) {
                    if (!aE) {
                        aE = g(aH)
                    }
                    aJ = aE.length;
                    while (aJ--) {
                        aI = ab(aE[aJ]);
                        if (aI[aa]) {
                            aF.push(aI)
                        } else {
                            aG.push(aI)
                        }
                    }
                    aI = N(aH, aw(aG, aF));
                    aI.selector = aH
                }
                return aI
            };
            R = ai.select = function (aL, aN, aK, aH) {
                var aJ, aE, aM, aO, aG, aF = typeof aL === "function" && aL, aI = !aH && g((aL = aF.selector || aL));
                aK = aK || [];
                if (aI.length === 1) {
                    aE = aI[0] = aI[0].slice(0);
                    if (aE.length > 2 && (aM = aE[0]).type === "ID" && Q.getById && aN.nodeType === 9 && ak && m.relative[aE[1].type]) {
                        aN = (m.find.ID(aM.matches[0].replace(c, p), aN) || [])[0];
                        if (!aN) {
                            return aK
                        } else {
                            if (aF) {
                                aN = aN.parentNode
                            }
                        }
                        aL = aL.slice(aE.shift().value.length)
                    }
                    aJ = f.needsContext.test(aL) ? 0 : aE.length;
                    while (aJ--) {
                        aM = aE[aJ];
                        if (m.relative[(aO = aM.type)]) {
                            break
                        }
                        if ((aG = m.find[aO])) {
                            if ((aH = aG(aM.matches[0].replace(c, p), h.test(aE[0].type) && J(aN.parentNode) || aN))) {
                                aE.splice(aJ, 1);
                                aL = aH.length && j(aE);
                                if (!aL) {
                                    x.apply(aK, aH);
                                    return aK
                                }
                                break
                            }
                        }
                    }
                }
                (aF || G(aL, aI))(aH, aN, !ak, aK, h.test(aL) && J(aN.parentNode) || aN);
                return aK
            };
            Q.sortStable = aa.split("").sort(S).join("") === aa;
            Q.detectDuplicates = !!F;
            av();
            Q.sortDetached = ao(function (aE) {
                return aE.compareDocumentPosition(W.createElement("div")) & 1
            });
            if (!ao(function (aE) {
                    aE.innerHTML = "<a href='#'></a>";
                    return aE.firstChild.getAttribute("href") === "#"
                })) {
                M("type|href|height|width", function (aF, aG, aE) {
                    if (!aE) {
                        return aF.getAttribute(aG, aG.toLowerCase() === "type" ? 1 : 2)
                    }
                })
            }
            if (!Q.attributes || !ao(function (aE) {
                    aE.innerHTML = "<input/>";
                    aE.firstChild.setAttribute("value", "");
                    return aE.firstChild.getAttribute("value") === ""
                })) {
                M("value", function (aF, aG, aE) {
                    if (!aE && aF.nodeName.toLowerCase() === "input") {
                        return aF.defaultValue
                    }
                })
            }
            if (!ao(function (aE) {
                    return aE.getAttribute("disabled") == null
                })) {
                M(w, function (aG, aH, aE) {
                    var aF;
                    if (!aE) {
                        return aG[aH] === true ? aH.toLowerCase() : (aF = aG.getAttributeNode(aH)) && aF.specified ? aF.value : null
                    }
                })
            }
            return ai
        })(ch);
    ee.find = ct;
    ee.expr = ct.selectors;
    ee.expr[":"] = ee.expr.pseudos;
    ee.unique = ct.uniqueSort;
    ee.text = ct.getText;
    ee.isXMLDoc = ct.isXML;
    ee.contains = ct.contains;
    var d4 = ee.expr.match.needsContext;
    var b8 = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
    var dr = /^.[^:#\[\.,]*$/;

    function es(c, b, a) {
        if (ee.isFunction(b)) {
            return ee.grep(c, function (d, f) {
                return !!b.call(d, f, d) !== a
            })
        }
        if (b.nodeType) {
            return ee.grep(c, function (d) {
                return (d === b) !== a
            })
        }
        if (typeof b === "string") {
            if (dr.test(b)) {
                return ee.filter(b, c, a)
            }
            b = ee.filter(b, c)
        }
        return ee.grep(c, function (d) {
            return (ee.inArray(d, b) >= 0) !== a
        })
    }

    ee.filter = function (c, b, d) {
        var a = b[0];
        if (d) {
            c = ":not(" + c + ")"
        }
        return b.length === 1 && a.nodeType === 1 ? ee.find.matchesSelector(a, c) ? [a] : [] : ee.find.matches(c, ee.grep(b, function (f) {
            return f.nodeType === 1
        }))
    };
    ee.fn.extend({
        find: function (f) {
            var a, c = [], d = this, b = d.length;
            if (typeof f !== "string") {
                return this.pushStack(ee(f).filter(function () {
                    for (a = 0; a < b; a++) {
                        if (ee.contains(d[a], this)) {
                            return true
                        }
                    }
                }))
            }
            for (a = 0; a < b; a++) {
                ee.find(f, d[a], c)
            }
            c = this.pushStack(b > 1 ? ee.unique(c) : c);
            c.selector = this.selector ? this.selector + " " + f : f;
            return c
        }, filter: function (a) {
            return this.pushStack(es(this, a || [], false))
        }, not: function (a) {
            return this.pushStack(es(this, a || [], true))
        }, is: function (a) {
            return !!es(this, typeof a === "string" && d4.test(a) ? ee(a) : a || [], false).length
        }
    });
    var eb, cp = ch.document, dB = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, dT = ee.fn.init = function (b, d) {
        var a, c;
        if (!b) {
            return this
        }
        if (typeof b === "string") {
            if (b.charAt(0) === "<" && b.charAt(b.length - 1) === ">" && b.length >= 3) {
                a = [null, b, null]
            } else {
                a = dB.exec(b)
            }
            if (a && (a[1] || !d)) {
                if (a[1]) {
                    d = d instanceof ee ? d[0] : d;
                    ee.merge(this, ee.parseHTML(a[1], d && d.nodeType ? d.ownerDocument || d : cp, true));
                    if (b8.test(a[1]) && ee.isPlainObject(d)) {
                        for (a in d) {
                            if (ee.isFunction(this[a])) {
                                this[a](d[a])
                            } else {
                                this.attr(a, d[a])
                            }
                        }
                    }
                    return this
                } else {
                    c = cp.getElementById(a[2]);
                    if (c && c.parentNode) {
                        if (c.id !== a[2]) {
                            return eb.find(b)
                        }
                        this.length = 1;
                        this[0] = c
                    }
                    this.context = cp;
                    this.selector = b;
                    return this
                }
            } else {
                if (!d || d.jquery) {
                    return (d || eb).find(b)
                } else {
                    return this.constructor(d).find(b)
                }
            }
        } else {
            if (b.nodeType) {
                this.context = this[0] = b;
                this.length = 1;
                return this
            } else {
                if (ee.isFunction(b)) {
                    return typeof eb.ready !== "undefined" ? eb.ready(b) : b(ee)
                }
            }
        }
        if (b.selector !== undefined) {
            this.selector = b.selector;
            this.context = b.context
        }
        return ee.makeArray(b, this)
    };
    dT.prototype = ee.fn;
    eb = ee(cp);
    var ez = /^(?:parents|prev(?:Until|All))/, ep = {children: true, contents: true, next: true, prev: true};
    ee.extend({
        dir: function (f, a, c) {
            var b = [], d = f[a];
            while (d && d.nodeType !== 9 && (c === undefined || d.nodeType !== 1 || !ee(d).is(c))) {
                if (d.nodeType === 1) {
                    b.push(d)
                }
                d = d[a]
            }
            return b
        }, sibling: function (c, a) {
            var b = [];
            for (; c; c = c.nextSibling) {
                if (c.nodeType === 1 && c !== a) {
                    b.push(c)
                }
            }
            return b
        }
    });
    ee.fn.extend({
        has: function (b) {
            var c, d = ee(b, this), a = d.length;
            return this.filter(function () {
                for (c = 0; c < a; c++) {
                    if (ee.contains(this, d[c])) {
                        return true
                    }
                }
            })
        }, closest: function (f, d) {
            var c, g = 0, h = this.length, b = [],
                a = d4.test(f) || typeof f !== "string" ? ee(f, d || this.context) : 0;
            for (; g < h; g++) {
                for (c = this[g]; c && c !== d; c = c.parentNode) {
                    if (c.nodeType < 11 && (a ? a.index(c) > -1 : c.nodeType === 1 && ee.find.matchesSelector(c, f))) {
                        b.push(c);
                        break
                    }
                }
            }
            return this.pushStack(b.length > 1 ? ee.unique(b) : b)
        }, index: function (a) {
            if (!a) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
            }
            if (typeof a === "string") {
                return ee.inArray(this[0], ee(a))
            }
            return ee.inArray(a.jquery ? a[0] : a, this)
        }, add: function (b, a) {
            return this.pushStack(ee.unique(ee.merge(this.get(), ee(b, a))))
        }, addBack: function (a) {
            return this.add(a == null ? this.prevObject : this.prevObject.filter(a))
        }
    });
    function eJ(a, b) {
        do {
            a = a[b]
        } while (a && a.nodeType !== 1);
        return a
    }

    ee.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        }, parents: function (a) {
            return ee.dir(a, "parentNode")
        }, parentsUntil: function (c, a, b) {
            return ee.dir(c, "parentNode", b)
        }, next: function (a) {
            return eJ(a, "nextSibling")
        }, prev: function (a) {
            return eJ(a, "previousSibling")
        }, nextAll: function (a) {
            return ee.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return ee.dir(a, "previousSibling")
        }, nextUntil: function (c, a, b) {
            return ee.dir(c, "nextSibling", b)
        }, prevUntil: function (c, a, b) {
            return ee.dir(c, "previousSibling", b)
        }, siblings: function (a) {
            return ee.sibling((a.parentNode || {}).firstChild, a)
        }, children: function (a) {
            return ee.sibling(a.firstChild)
        }, contents: function (a) {
            return ee.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ee.merge([], a.childNodes)
        }
    }, function (b, a) {
        ee.fn[b] = function (c, f) {
            var d = ee.map(this, a, c);
            if (b.slice(-5) !== "Until") {
                f = c
            }
            if (f && typeof f === "string") {
                d = ee.filter(f, d)
            }
            if (this.length > 1) {
                if (!ep[b]) {
                    d = ee.unique(d)
                }
                if (ez.test(b)) {
                    d = d.reverse()
                }
            }
            return this.pushStack(d)
        }
    });
    var cF = (/\S+/g);
    var ey = {};

    function dX(a) {
        var b = ey[a] = {};
        ee.each(a.match(cF) || [], function (c, d) {
            b[d] = true
        });
        return b
    }

    ee.Callbacks = function (a) {
        a = typeof a === "string" ? (ey[a] || dX(a)) : ee.extend({}, a);
        var l, g, m, k, j, h, d = [], c = !a.once && [], f = function (n) {
            g = a.memory && n;
            m = true;
            j = h || 0;
            h = 0;
            k = d.length;
            l = true;
            for (; d && j < k; j++) {
                if (d[j].apply(n[0], n[1]) === false && a.stopOnFalse) {
                    g = false;
                    break
                }
            }
            l = false;
            if (d) {
                if (c) {
                    if (c.length) {
                        f(c.shift())
                    }
                } else {
                    if (g) {
                        d = []
                    } else {
                        b.disable()
                    }
                }
            }
        }, b = {
            add: function () {
                if (d) {
                    var n = d.length;
                    (function o(p) {
                        ee.each(p, function (r, s) {
                            var q = ee.type(s);
                            if (q === "function") {
                                if (!a.unique || !b.has(s)) {
                                    d.push(s)
                                }
                            } else {
                                if (s && s.length && q !== "string") {
                                    o(s)
                                }
                            }
                        })
                    })(arguments);
                    if (l) {
                        k = d.length
                    } else {
                        if (g) {
                            h = n;
                            f(g)
                        }
                    }
                }
                return this
            }, remove: function () {
                if (d) {
                    ee.each(arguments, function (n, p) {
                        var o;
                        while ((o = ee.inArray(p, d, o)) > -1) {
                            d.splice(o, 1);
                            if (l) {
                                if (o <= k) {
                                    k--
                                }
                                if (o <= j) {
                                    j--
                                }
                            }
                        }
                    })
                }
                return this
            }, has: function (n) {
                return n ? ee.inArray(n, d) > -1 : !!(d && d.length)
            }, empty: function () {
                d = [];
                k = 0;
                return this
            }, disable: function () {
                d = c = g = undefined;
                return this
            }, disabled: function () {
                return !d
            }, lock: function () {
                c = undefined;
                if (!g) {
                    b.disable()
                }
                return this
            }, locked: function () {
                return !c
            }, fireWith: function (n, o) {
                if (d && (!m || c)) {
                    o = o || [];
                    o = [n, o.slice ? o.slice() : o];
                    if (l) {
                        c.push(o)
                    } else {
                        f(o)
                    }
                }
                return this
            }, fire: function () {
                b.fireWith(this, arguments);
                return this
            }, fired: function () {
                return !!m
            }
        };
        return b
    };
    ee.extend({
        Deferred: function (f) {
            var a = [["resolve", "done", ee.Callbacks("once memory"), "resolved"], ["reject", "fail", ee.Callbacks("once memory"), "rejected"], ["notify", "progress", ee.Callbacks("memory")]],
                d = "pending", c = {
                    state: function () {
                        return d
                    }, always: function () {
                        b.done(arguments).fail(arguments);
                        return this
                    }, then: function () {
                        var g = arguments;
                        return ee.Deferred(function (h) {
                            ee.each(a, function (k, l) {
                                var j = ee.isFunction(g[k]) && g[k];
                                b[l[1]](function () {
                                    var m = j && j.apply(this, arguments);
                                    if (m && ee.isFunction(m.promise)) {
                                        m.promise().done(h.resolve).fail(h.reject).progress(h.notify)
                                    } else {
                                        h[l[0] + "With"](this === c ? h.promise() : this, j ? [m] : arguments)
                                    }
                                })
                            });
                            g = null
                        }).promise()
                    }, promise: function (g) {
                        return g != null ? ee.extend(g, c) : c
                    }
                }, b = {};
            c.pipe = c.then;
            ee.each(a, function (j, k) {
                var g = k[2], h = k[3];
                c[k[1]] = g.add;
                if (h) {
                    g.add(function () {
                        d = h
                    }, a[j ^ 1][2].disable, a[2][2].lock)
                }
                b[k[0]] = function () {
                    b[k[0] + "With"](this === b ? c : this, arguments);
                    return this
                };
                b[k[0] + "With"] = g.fireWith
            });
            c.promise(b);
            if (f) {
                f.call(b, b)
            }
            return b
        }, when: function (j) {
            var f = 0, d = c4.call(arguments), l = d.length, g = l !== 1 || (j && ee.isFunction(j.promise)) ? l : 0,
                a = g === 1 ? j : ee.Deferred(), k = function (o, n, m) {
                    return function (p) {
                        n[o] = this;
                        m[o] = arguments.length > 1 ? c4.call(arguments) : p;
                        if (m === b) {
                            a.notifyWith(n, m)
                        } else {
                            if (!(--g)) {
                                a.resolveWith(n, m)
                            }
                        }
                    }
                }, b, h, c;
            if (l > 1) {
                b = new Array(l);
                h = new Array(l);
                c = new Array(l);
                for (; f < l; f++) {
                    if (d[f] && ee.isFunction(d[f].promise)) {
                        d[f].promise().done(k(f, c, d)).fail(a.reject).progress(k(f, h, b))
                    } else {
                        --g
                    }
                }
            }
            if (!g) {
                a.resolveWith(c, d)
            }
            return a.promise()
        }
    });
    var d9;
    ee.fn.ready = function (a) {
        ee.ready.promise().done(a);
        return this
    };
    ee.extend({
        isReady: false, readyWait: 1, holdReady: function (a) {
            if (a) {
                ee.readyWait++
            } else {
                ee.ready(true)
            }
        }, ready: function (a) {
            if (a === true ? --ee.readyWait : ee.isReady) {
                return
            }
            if (!cp.body) {
                return setTimeout(ee.ready)
            }
            ee.isReady = true;
            if (a !== true && --ee.readyWait > 0) {
                return
            }
            d9.resolveWith(cp, [ee]);
            if (ee.fn.triggerHandler) {
                ee(cp).triggerHandler("ready");
                ee(cp).off("ready")
            }
        }
    });
    function cC() {
        if (cp.addEventListener) {
            cp.removeEventListener("DOMContentLoaded", dH, false);
            ch.removeEventListener("load", dH, false)
        } else {
            cp.detachEvent("onreadystatechange", dH);
            ch.detachEvent("onload", dH)
        }
    }

    function dH() {
        if (cp.addEventListener || event.type === "load" || cp.readyState === "complete") {
            cC();
            ee.ready()
        }
    }

    ee.ready.promise = function (b) {
        if (!d9) {
            d9 = ee.Deferred();
            if (cp.readyState === "complete") {
                setTimeout(ee.ready)
            } else {
                if (cp.addEventListener) {
                    cp.addEventListener("DOMContentLoaded", dH, false);
                    ch.addEventListener("load", dH, false)
                } else {
                    cp.attachEvent("onreadystatechange", dH);
                    ch.attachEvent("onload", dH);
                    var c = false;
                    try {
                        c = ch.frameElement == null && cp.documentElement
                    } catch (d) {
                    }
                    if (c && c.doScroll) {
                        (function a() {
                            if (!ee.isReady) {
                                try {
                                    c.doScroll("left")
                                } catch (f) {
                                    return setTimeout(a, 50)
                                }
                                cC();
                                ee.ready()
                            }
                        })()
                    }
                }
            }
        }
        return d9.promise(b)
    };
    var dW = typeof undefined;
    var dd;
    for (dd in ee(cN)) {
        break
    }
    cN.ownLast = dd !== "0";
    cN.inlineBlockNeedsLayout = false;
    ee(function () {
        var d, c, b, a;
        b = cp.getElementsByTagName("body")[0];
        if (!b || !b.style) {
            return
        }
        c = cp.createElement("div");
        a = cp.createElement("div");
        a.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        b.appendChild(a).appendChild(c);
        if (typeof c.style.zoom !== dW) {
            c.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
            cN.inlineBlockNeedsLayout = d = c.offsetWidth === 3;
            if (d) {
                b.style.zoom = 1
            }
        }
        b.removeChild(a)
    });
    (function () {
        var b = cp.createElement("div");
        if (cN.deleteExpando == null) {
            cN.deleteExpando = true;
            try {
                delete b.test
            } catch (a) {
                cN.deleteExpando = false
            }
        }
        b = null
    })();
    ee.acceptData = function (c) {
        var a = ee.noData[(c.nodeName + " ").toLowerCase()], b = +c.nodeType || 1;
        return b !== 1 && b !== 9 ? false : !a || a !== true && c.getAttribute("classid") === a
    };
    var ej = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, ex = /([A-Z])/g;

    function ei(d, f, c) {
        if (c === undefined && d.nodeType === 1) {
            var a = "data-" + f.replace(ex, "-$1").toLowerCase();
            c = d.getAttribute(a);
            if (typeof c === "string") {
                try {
                    c = c === "true" ? true : c === "false" ? false : c === "null" ? null : +c + "" === c ? +c : ej.test(c) ? ee.parseJSON(c) : c
                } catch (b) {
                }
                ee.data(d, f, c)
            } else {
                c = undefined
            }
        }
        return c
    }

    function dA(a) {
        var b;
        for (b in a) {
            if (b === "data" && ee.isEmptyObject(a[b])) {
                continue
            }
            if (b !== "toJSON") {
                return false
            }
        }
        return true
    }

    function c1(l, h, j, k) {
        if (!ee.acceptData(l)) {
            return
        }
        var c, g, b = ee.expando, a = l.nodeType, f = a ? ee.cache : l, d = a ? l[b] : l[b] && b;
        if ((!d || !f[d] || (!k && !f[d].data)) && j === undefined && typeof h === "string") {
            return
        }
        if (!d) {
            if (a) {
                d = l[b] = eC.pop() || ee.guid++
            } else {
                d = b
            }
        }
        if (!f[d]) {
            f[d] = a ? {} : {toJSON: ee.noop}
        }
        if (typeof h === "object" || typeof h === "function") {
            if (k) {
                f[d] = ee.extend(f[d], h)
            } else {
                f[d].data = ee.extend(f[d].data, h)
            }
        }
        g = f[d];
        if (!k) {
            if (!g.data) {
                g.data = {}
            }
            g = g.data
        }
        if (j !== undefined) {
            g[ee.camelCase(h)] = j
        }
        if (typeof h === "string") {
            c = g[h];
            if (c == null) {
                c = g[ee.camelCase(h)]
            }
        } else {
            c = g
        }
        return c
    }

    function cW(a, h, g) {
        if (!ee.acceptData(a)) {
            return
        }
        var d, c, b = a.nodeType, j = b ? ee.cache : a, f = b ? a[ee.expando] : ee.expando;
        if (!j[f]) {
            return
        }
        if (h) {
            d = g ? j[f] : j[f].data;
            if (d) {
                if (!ee.isArray(h)) {
                    if (h in d) {
                        h = [h]
                    } else {
                        h = ee.camelCase(h);
                        if (h in d) {
                            h = [h]
                        } else {
                            h = h.split(" ")
                        }
                    }
                } else {
                    h = h.concat(ee.map(h, ee.camelCase))
                }
                c = h.length;
                while (c--) {
                    delete d[h[c]]
                }
                if (g ? !dA(d) : !ee.isEmptyObject(d)) {
                    return
                }
            }
        }
        if (!g) {
            delete j[f].data;
            if (!dA(j[f])) {
                return
            }
        }
        if (b) {
            ee.cleanData([a], true)
        } else {
            if (cN.deleteExpando || j != j.window) {
                delete j[f]
            } else {
                j[f] = null
            }
        }
    }

    ee.extend({
        cache: {},
        noData: {"applet ": true, "embed ": true, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (a) {
            a = a.nodeType ? ee.cache[a[ee.expando]] : a[ee.expando];
            return !!a && !dA(a)
        },
        data: function (a, b, c) {
            return c1(a, b, c)
        },
        removeData: function (a, b) {
            return cW(a, b)
        },
        _data: function (a, b, c) {
            return c1(a, b, c, true)
        },
        _removeData: function (a, b) {
            return cW(a, b, true)
        }
    });
    ee.fn.extend({
        data: function (f, a) {
            var g, h, c, d = this[0], b = d && d.attributes;
            if (f === undefined) {
                if (this.length) {
                    c = ee.data(d);
                    if (d.nodeType === 1 && !ee._data(d, "parsedAttrs")) {
                        g = b.length;
                        while (g--) {
                            if (b[g]) {
                                h = b[g].name;
                                if (h.indexOf("data-") === 0) {
                                    h = ee.camelCase(h.slice(5));
                                    ei(d, h, c[h])
                                }
                            }
                        }
                        ee._data(d, "parsedAttrs", true)
                    }
                }
                return c
            }
            if (typeof f === "object") {
                return this.each(function () {
                    ee.data(this, f)
                })
            }
            return arguments.length > 1 ? this.each(function () {
                ee.data(this, f, a)
            }) : d ? ei(d, f, ee.data(d, f)) : undefined
        }, removeData: function (a) {
            return this.each(function () {
                ee.removeData(this, a)
            })
        }
    });
    ee.extend({
        queue: function (d, a, c) {
            var b;
            if (d) {
                a = (a || "fx") + "queue";
                b = ee._data(d, a);
                if (c) {
                    if (!b || ee.isArray(c)) {
                        b = ee._data(d, a, ee.makeArray(c))
                    } else {
                        b.push(c)
                    }
                }
                return b || []
            }
        }, dequeue: function (f, d) {
            d = d || "fx";
            var a = ee.queue(f, d), c = a.length, g = a.shift(), b = ee._queueHooks(f, d), h = function () {
                ee.dequeue(f, d)
            };
            if (g === "inprogress") {
                g = a.shift();
                c--
            }
            if (g) {
                if (d === "fx") {
                    a.unshift("inprogress")
                }
                delete b.stop;
                g.call(f, h, b)
            }
            if (!c && b) {
                b.empty.fire()
            }
        }, _queueHooks: function (c, a) {
            var b = a + "queueHooks";
            return ee._data(c, b) || ee._data(c, b, {
                    empty: ee.Callbacks("once memory").add(function () {
                        ee._removeData(c, a + "queue");
                        ee._removeData(c, b)
                    })
                })
        }
    });
    ee.fn.extend({
        queue: function (b, a) {
            var c = 2;
            if (typeof b !== "string") {
                a = b;
                b = "fx";
                c--
            }
            if (arguments.length < c) {
                return ee.queue(this[0], b)
            }
            return a === undefined ? this : this.each(function () {
                var d = ee.queue(this, b, a);
                ee._queueHooks(this, b);
                if (b === "fx" && d[0] !== "inprogress") {
                    ee.dequeue(this, b)
                }
            })
        }, dequeue: function (a) {
            return this.each(function () {
                ee.dequeue(this, a)
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (h, g) {
            var j, d = 1, f = ee.Deferred(), b = this, c = this.length, a = function () {
                if (!(--d)) {
                    f.resolveWith(b, [b])
                }
            };
            if (typeof h !== "string") {
                g = h;
                h = undefined
            }
            h = h || "fx";
            while (c--) {
                j = ee._data(b[c], h + "queueHooks");
                if (j && j.empty) {
                    d++;
                    j.empty.add(a)
                }
            }
            a();
            return f.promise(g)
        }
    });
    var cP = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
    var c7 = ["Top", "Right", "Bottom", "Left"];
    var cz = function (a, b) {
        a = b || a;
        return ee.css(a, "display") === "none" || !ee.contains(a.ownerDocument, a)
    };
    var d3 = ee.access = function (l, h, c, g, k, a, b) {
        var f = 0, d = l.length, j = c == null;
        if (ee.type(c) === "object") {
            k = true;
            for (f in c) {
                ee.access(l, h, f, c[f], true, a, b)
            }
        } else {
            if (g !== undefined) {
                k = true;
                if (!ee.isFunction(g)) {
                    b = true
                }
                if (j) {
                    if (b) {
                        h.call(l, g);
                        h = null
                    } else {
                        j = h;
                        h = function (m, n, o) {
                            return j.call(ee(m), o)
                        }
                    }
                }
                if (h) {
                    for (; f < d; f++) {
                        h(l[f], c, b ? g : g.call(l[f], f, h(l[f], c)))
                    }
                }
            }
        }
        return k ? l : j ? h.call(l) : d ? h(l[0], c) : a
    };
    var dp = (/^(?:checkbox|radio)$/i);
    (function () {
        var a = cp.createElement("input"), b = cp.createElement("div"), d = cp.createDocumentFragment();
        b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        cN.leadingWhitespace = b.firstChild.nodeType === 3;
        cN.tbody = !b.getElementsByTagName("tbody").length;
        cN.htmlSerialize = !!b.getElementsByTagName("link").length;
        cN.html5Clone = cp.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
        a.type = "checkbox";
        a.checked = true;
        d.appendChild(a);
        cN.appendChecked = a.checked;
        b.innerHTML = "<textarea>x</textarea>";
        cN.noCloneChecked = !!b.cloneNode(true).lastChild.defaultValue;
        d.appendChild(b);
        b.innerHTML = "<input type='radio' checked='checked' name='t'/>";
        cN.checkClone = b.cloneNode(true).cloneNode(true).lastChild.checked;
        cN.noCloneEvent = true;
        if (b.attachEvent) {
            b.attachEvent("onclick", function () {
                cN.noCloneEvent = false
            });
            b.cloneNode(true).click()
        }
        if (cN.deleteExpando == null) {
            cN.deleteExpando = true;
            try {
                delete b.test
            } catch (c) {
                cN.deleteExpando = false
            }
        }
    })();
    (function () {
        var c, a, b = cp.createElement("div");
        for (c in {submit: true, change: true, focusin: true}) {
            a = "on" + c;
            if (!(cN[c + "Bubbles"] = a in ch)) {
                b.setAttribute(a, "t");
                cN[c + "Bubbles"] = b.attributes[a].expando === false
            }
        }
        b = null
    })();
    var dP = /^(?:input|select|textarea)$/i, dG = /^key/, dV = /^(?:mouse|pointer|contextmenu)|click/,
        cU = /^(?:focusinfocus|focusoutblur)$/, eo = /^([^.]*)(?:\.(.+)|)$/;

    function dM() {
        return true
    }

    function dx() {
        return false
    }

    function cv() {
        try {
            return cp.activeElement
        } catch (a) {
        }
    }

    ee.event = {
        global: {},
        add: function (n, d, r, k, m) {
            var g, q, l, j, b, f, s, o, a, p, h, c = ee._data(n);
            if (!c) {
                return
            }
            if (r.handler) {
                j = r;
                r = j.handler;
                m = j.selector
            }
            if (!r.guid) {
                r.guid = ee.guid++
            }
            if (!(q = c.events)) {
                q = c.events = {}
            }
            if (!(f = c.handle)) {
                f = c.handle = function (t) {
                    return typeof ee !== dW && (!t || ee.event.triggered !== t.type) ? ee.event.dispatch.apply(f.elem, arguments) : undefined
                };
                f.elem = n
            }
            d = (d || "").match(cF) || [""];
            l = d.length;
            while (l--) {
                g = eo.exec(d[l]) || [];
                a = h = g[1];
                p = (g[2] || "").split(".").sort();
                if (!a) {
                    continue
                }
                b = ee.event.special[a] || {};
                a = (m ? b.delegateType : b.bindType) || a;
                b = ee.event.special[a] || {};
                s = ee.extend({
                    type: a,
                    origType: h,
                    data: k,
                    handler: r,
                    guid: r.guid,
                    selector: m,
                    needsContext: m && ee.expr.match.needsContext.test(m),
                    namespace: p.join(".")
                }, j);
                if (!(o = q[a])) {
                    o = q[a] = [];
                    o.delegateCount = 0;
                    if (!b.setup || b.setup.call(n, k, p, f) === false) {
                        if (n.addEventListener) {
                            n.addEventListener(a, f, false)
                        } else {
                            if (n.attachEvent) {
                                n.attachEvent("on" + a, f)
                            }
                        }
                    }
                }
                if (b.add) {
                    b.add.call(n, s);
                    if (!s.handler.guid) {
                        s.handler.guid = r.guid
                    }
                }
                if (m) {
                    o.splice(o.delegateCount++, 0, s)
                } else {
                    o.push(s)
                }
                ee.event.global[a] = true
            }
            n = null
        },
        remove: function (o, d, l, n, f) {
            var k, s, g, m, q, r, b, j, a, p, h, c = ee.hasData(o) && ee._data(o);
            if (!c || !(r = c.events)) {
                return
            }
            d = (d || "").match(cF) || [""];
            q = d.length;
            while (q--) {
                g = eo.exec(d[q]) || [];
                a = h = g[1];
                p = (g[2] || "").split(".").sort();
                if (!a) {
                    for (a in r) {
                        ee.event.remove(o, a + d[q], l, n, true)
                    }
                    continue
                }
                b = ee.event.special[a] || {};
                a = (n ? b.delegateType : b.bindType) || a;
                j = r[a] || [];
                g = g[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)");
                m = k = j.length;
                while (k--) {
                    s = j[k];
                    if ((f || h === s.origType) && (!l || l.guid === s.guid) && (!g || g.test(s.namespace)) && (!n || n === s.selector || n === "**" && s.selector)) {
                        j.splice(k, 1);
                        if (s.selector) {
                            j.delegateCount--
                        }
                        if (b.remove) {
                            b.remove.call(o, s)
                        }
                    }
                }
                if (m && !j.length) {
                    if (!b.teardown || b.teardown.call(o, p, c.handle) === false) {
                        ee.removeEvent(o, a, c.handle)
                    }
                    delete r[a]
                }
            }
            if (ee.isEmptyObject(r)) {
                delete c.handle;
                ee._removeData(o, "events")
            }
        },
        trigger: function (l, g, n, m) {
            var f, o, a, q, c, h, j, k = [n || cp], b = eD.call(l, "type") ? l.type : l,
                p = eD.call(l, "namespace") ? l.namespace.split(".") : [];
            a = h = n = n || cp;
            if (n.nodeType === 3 || n.nodeType === 8) {
                return
            }
            if (cU.test(b + ee.event.triggered)) {
                return
            }
            if (b.indexOf(".") >= 0) {
                p = b.split(".");
                b = p.shift();
                p.sort()
            }
            o = b.indexOf(":") < 0 && "on" + b;
            l = l[ee.expando] ? l : new ee.Event(b, typeof l === "object" && l);
            l.isTrigger = m ? 2 : 3;
            l.namespace = p.join(".");
            l.namespace_re = l.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            l.result = undefined;
            if (!l.target) {
                l.target = n
            }
            g = g == null ? [l] : ee.makeArray(g, [l]);
            c = ee.event.special[b] || {};
            if (!m && c.trigger && c.trigger.apply(n, g) === false) {
                return
            }
            if (!m && !c.noBubble && !ee.isWindow(n)) {
                q = c.delegateType || b;
                if (!cU.test(q + b)) {
                    a = a.parentNode
                }
                for (; a; a = a.parentNode) {
                    k.push(a);
                    h = a
                }
                if (h === (n.ownerDocument || cp)) {
                    k.push(h.defaultView || h.parentWindow || ch)
                }
            }
            j = 0;
            while ((a = k[j++]) && !l.isPropagationStopped()) {
                l.type = j > 1 ? q : c.bindType || b;
                f = (ee._data(a, "events") || {})[l.type] && ee._data(a, "handle");
                if (f) {
                    f.apply(a, g)
                }
                f = o && a[o];
                if (f && f.apply && ee.acceptData(a)) {
                    l.result = f.apply(a, g);
                    if (l.result === false) {
                        l.preventDefault()
                    }
                }
            }
            l.type = b;
            if (!m && !l.isDefaultPrevented()) {
                if ((!c._default || c._default.apply(k.pop(), g) === false) && ee.acceptData(n)) {
                    if (o && n[b] && !ee.isWindow(n)) {
                        h = n[o];
                        if (h) {
                            n[o] = null
                        }
                        ee.event.triggered = b;
                        try {
                            n[b]()
                        } catch (d) {
                        }
                        ee.event.triggered = undefined;
                        if (h) {
                            n[o] = h
                        }
                    }
                }
            }
            return l.result
        },
        dispatch: function (l) {
            l = ee.event.fix(l);
            var j, h, a, g, k, b = [], c = c4.call(arguments), f = (ee._data(this, "events") || {})[l.type] || [],
                d = ee.event.special[l.type] || {};
            c[0] = l;
            l.delegateTarget = this;
            if (d.preDispatch && d.preDispatch.call(this, l) === false) {
                return
            }
            b = ee.event.handlers.call(this, l, f);
            j = 0;
            while ((g = b[j++]) && !l.isPropagationStopped()) {
                l.currentTarget = g.elem;
                k = 0;
                while ((a = g.handlers[k++]) && !l.isImmediatePropagationStopped()) {
                    if (!l.namespace_re || l.namespace_re.test(a.namespace)) {
                        l.handleObj = a;
                        l.data = a.data;
                        h = ((ee.event.special[a.origType] || {}).handle || a.handler).apply(g.elem, c);
                        if (h !== undefined) {
                            if ((l.result = h) === false) {
                                l.preventDefault();
                                l.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (d.postDispatch) {
                d.postDispatch.call(this, l)
            }
            return l.result
        },
        handlers: function (k, d) {
            var f, b, g, h, c = [], j = d.delegateCount, a = k.target;
            if (j && a.nodeType && (!k.button || k.type !== "click")) {
                for (; a != this; a = a.parentNode || this) {
                    if (a.nodeType === 1 && (a.disabled !== true || k.type !== "click")) {
                        g = [];
                        for (h = 0; h < j; h++) {
                            b = d[h];
                            f = b.selector + " ";
                            if (g[f] === undefined) {
                                g[f] = b.needsContext ? ee(f, this).index(a) >= 0 : ee.find(f, this, null, [a]).length
                            }
                            if (g[f]) {
                                g.push(b)
                            }
                        }
                        if (g.length) {
                            c.push({elem: a, handlers: g})
                        }
                    }
                }
            }
            if (j < d.length) {
                c.push({elem: this, handlers: d.slice(j)})
            }
            return c
        },
        fix: function (f) {
            if (f[ee.expando]) {
                return f
            }
            var h, a, c, g = f.type, b = f, d = this.fixHooks[g];
            if (!d) {
                this.fixHooks[g] = d = dV.test(g) ? this.mouseHooks : dG.test(g) ? this.keyHooks : {}
            }
            c = d.props ? this.props.concat(d.props) : this.props;
            f = new ee.Event(b);
            h = c.length;
            while (h--) {
                a = c[h];
                f[a] = b[a]
            }
            if (!f.target) {
                f.target = b.srcElement || cp
            }
            if (f.target.nodeType === 3) {
                f.target = f.target.parentNode
            }
            f.metaKey = !!f.metaKey;
            return d.filter ? d.filter(f, b) : f
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                if (a.which == null) {
                    a.which = b.charCode != null ? b.charCode : b.keyCode
                }
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (g, h) {
                var f, b, d, a = h.button, c = h.fromElement;
                if (g.pageX == null && h.clientX != null) {
                    b = g.target.ownerDocument || cp;
                    d = b.documentElement;
                    f = b.body;
                    g.pageX = h.clientX + (d && d.scrollLeft || f && f.scrollLeft || 0) - (d && d.clientLeft || f && f.clientLeft || 0);
                    g.pageY = h.clientY + (d && d.scrollTop || f && f.scrollTop || 0) - (d && d.clientTop || f && f.clientTop || 0)
                }
                if (!g.relatedTarget && c) {
                    g.relatedTarget = c === g.target ? h.toElement : c
                }
                if (!g.which && a !== undefined) {
                    g.which = (a & 1 ? 1 : (a & 2 ? 3 : (a & 4 ? 2 : 0)))
                }
                return g
            }
        },
        special: {
            load: {noBubble: true}, focus: {
                trigger: function () {
                    if (this !== cv() && this.focus) {
                        try {
                            this.focus();
                            return false
                        } catch (a) {
                        }
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    if (this === cv() && this.blur) {
                        this.blur();
                        return false
                    }
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    if (ee.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false
                    }
                }, _default: function (a) {
                    return ee.nodeName(a.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (a) {
                    if (a.result !== undefined && a.originalEvent) {
                        a.originalEvent.returnValue = a.result
                    }
                }
            }
        },
        simulate: function (f, c, d, a) {
            var b = ee.extend(new ee.Event(), d, {type: f, isSimulated: true, originalEvent: {}});
            if (a) {
                ee.event.trigger(b, null, c)
            } else {
                ee.event.dispatch.call(c, b)
            }
            if (b.isDefaultPrevented()) {
                d.preventDefault()
            }
        }
    };
    ee.removeEvent = cp.removeEventListener ? function (a, b, c) {
        if (a.removeEventListener) {
            a.removeEventListener(b, c, false)
        }
    } : function (d, a, c) {
        var b = "on" + a;
        if (d.detachEvent) {
            if (typeof d[b] === dW) {
                d[b] = null
            }
            d.detachEvent(b, c)
        }
    };
    ee.Event = function (a, b) {
        if (!(this instanceof ee.Event)) {
            return new ee.Event(a, b)
        }
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type;
            this.isDefaultPrevented = a.defaultPrevented || a.defaultPrevented === undefined && a.returnValue === false ? dM : dx
        } else {
            this.type = a
        }
        if (b) {
            ee.extend(this, b)
        }
        this.timeStamp = a && a.timeStamp || ee.now();
        this[ee.expando] = true
    };
    ee.Event.prototype = {
        isDefaultPrevented: dx,
        isPropagationStopped: dx,
        isImmediatePropagationStopped: dx,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = dM;
            if (!a) {
                return
            }
            if (a.preventDefault) {
                a.preventDefault()
            } else {
                a.returnValue = false
            }
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = dM;
            if (!a) {
                return
            }
            if (a.stopPropagation) {
                a.stopPropagation()
            }
            a.cancelBubble = true
        },
        stopImmediatePropagation: function () {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = dM;
            if (a && a.stopImmediatePropagation) {
                a.stopImmediatePropagation()
            }
            this.stopPropagation()
        }
    };
    ee.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (a, b) {
        ee.event.special[a] = {
            delegateType: b, bindType: b, handle: function (f) {
                var h, c = this, d = f.relatedTarget, g = f.handleObj;
                if (!d || (d !== c && !ee.contains(c, d))) {
                    f.type = g.origType;
                    h = g.handler.apply(this, arguments);
                    f.type = b
                }
                return h
            }
        }
    });
    if (!cN.submitBubbles) {
        ee.event.special.submit = {
            setup: function () {
                if (ee.nodeName(this, "form")) {
                    return false
                }
                ee.event.add(this, "click._submit keypress._submit", function (b) {
                    var c = b.target, a = ee.nodeName(c, "input") || ee.nodeName(c, "button") ? c.form : undefined;
                    if (a && !ee._data(a, "submitBubbles")) {
                        ee.event.add(a, "submit._submit", function (d) {
                            d._submit_bubble = true
                        });
                        ee._data(a, "submitBubbles", true)
                    }
                })
            }, postDispatch: function (a) {
                if (a._submit_bubble) {
                    delete a._submit_bubble;
                    if (this.parentNode && !a.isTrigger) {
                        ee.event.simulate("submit", this.parentNode, a, true)
                    }
                }
            }, teardown: function () {
                if (ee.nodeName(this, "form")) {
                    return false
                }
                ee.event.remove(this, "._submit")
            }
        }
    }
    if (!cN.changeBubbles) {
        ee.event.special.change = {
            setup: function () {
                if (dP.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        ee.event.add(this, "propertychange._change", function (a) {
                            if (a.originalEvent.propertyName === "checked") {
                                this._just_changed = true
                            }
                        });
                        ee.event.add(this, "click._change", function (a) {
                            if (this._just_changed && !a.isTrigger) {
                                this._just_changed = false
                            }
                            ee.event.simulate("change", this, a, true)
                        })
                    }
                    return false
                }
                ee.event.add(this, "beforeactivate._change", function (b) {
                    var a = b.target;
                    if (dP.test(a.nodeName) && !ee._data(a, "changeBubbles")) {
                        ee.event.add(a, "change._change", function (c) {
                            if (this.parentNode && !c.isSimulated && !c.isTrigger) {
                                ee.event.simulate("change", this.parentNode, c, true)
                            }
                        });
                        ee._data(a, "changeBubbles", true)
                    }
                })
            }, handle: function (a) {
                var b = a.target;
                if (this !== b || a.isSimulated || a.isTrigger || (b.type !== "radio" && b.type !== "checkbox")) {
                    return a.handleObj.handler.apply(this, arguments)
                }
            }, teardown: function () {
                ee.event.remove(this, "._change");
                return !dP.test(this.nodeName)
            }
        }
    }
    if (!cN.focusinBubbles) {
        ee.each({focus: "focusin", blur: "focusout"}, function (c, b) {
            var a = function (d) {
                ee.event.simulate(b, d.target, ee.event.fix(d), true)
            };
            ee.event.special[b] = {
                setup: function () {
                    var d = this.ownerDocument || this, f = ee._data(d, b);
                    if (!f) {
                        d.addEventListener(c, a, true)
                    }
                    ee._data(d, b, (f || 0) + 1)
                }, teardown: function () {
                    var d = this.ownerDocument || this, f = ee._data(d, b) - 1;
                    if (!f) {
                        d.removeEventListener(c, a, true);
                        ee._removeData(d, b)
                    } else {
                        ee._data(d, b, f)
                    }
                }
            }
        })
    }
    ee.fn.extend({
        on: function (h, f, d, b, a) {
            var g, c;
            if (typeof h === "object") {
                if (typeof f !== "string") {
                    d = d || f;
                    f = undefined
                }
                for (g in h) {
                    this.on(g, f, d, h[g], a)
                }
                return this
            }
            if (d == null && b == null) {
                b = f;
                d = f = undefined
            } else {
                if (b == null) {
                    if (typeof f === "string") {
                        b = d;
                        d = undefined
                    } else {
                        b = d;
                        d = f;
                        f = undefined
                    }
                }
            }
            if (b === false) {
                b = dx
            } else {
                if (!b) {
                    return this
                }
            }
            if (a === 1) {
                c = b;
                b = function (j) {
                    ee().off(j);
                    return c.apply(this, arguments)
                };
                b.guid = c.guid || (c.guid = ee.guid++)
            }
            return this.each(function () {
                ee.event.add(this, h, b, d, f)
            })
        }, one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        }, off: function (f, c, b) {
            var a, d;
            if (f && f.preventDefault && f.handleObj) {
                a = f.handleObj;
                ee(f.delegateTarget).off(a.namespace ? a.origType + "." + a.namespace : a.origType, a.selector, a.handler);
                return this
            }
            if (typeof f === "object") {
                for (d in f) {
                    this.off(d, c, f[d])
                }
                return this
            }
            if (c === false || typeof c === "function") {
                b = c;
                c = undefined
            }
            if (b === false) {
                b = dx
            }
            return this.each(function () {
                ee.event.remove(this, f, b, c)
            })
        }, trigger: function (b, a) {
            return this.each(function () {
                ee.event.trigger(b, a, this)
            })
        }, triggerHandler: function (b, c) {
            var a = this[0];
            if (a) {
                return ee.event.trigger(b, c, a, true)
            }
        }
    });
    function dq(b) {
        var c = c3.split("|"), a = b.createDocumentFragment();
        if (a.createElement) {
            while (c.length) {
                a.createElement(c.pop())
            }
        }
        return a
    }

    var c3 = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        dl = / jQuery\d+="(?:null|\d+)"/g, e = new RegExp("<(?:" + c3 + ")[\\s/>]", "i"), eg = /^\s+/,
        ds = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, cn = /<([\w:]+)/,
        dw = /<tbody/i, b6 = /<|&#?\w+;/, cr = /<(?:script|style|link)/i, cO = /checked\s*(?:[^=]|=\s*.checked.)/i,
        cY = /^$|\/(?:java|ecma)script/i, en = /^true\/(.*)/, eF = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, cX = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: cN.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, eh = dq(cp), dR = eh.appendChild(cp.createElement("div"));
    cX.optgroup = cX.option;
    cX.tbody = cX.tfoot = cX.colgroup = cX.caption = cX.thead;
    cX.th = cX.td;
    function cu(d, c) {
        var g, b, f = 0,
            a = typeof d.getElementsByTagName !== dW ? d.getElementsByTagName(c || "*") : typeof d.querySelectorAll !== dW ? d.querySelectorAll(c || "*") : undefined;
        if (!a) {
            for (a = [], g = d.childNodes || d; (b = g[f]) != null; f++) {
                if (!c || ee.nodeName(b, c)) {
                    a.push(b)
                } else {
                    ee.merge(a, cu(b, c))
                }
            }
        }
        return c === undefined || c && ee.nodeName(d, c) ? ee.merge([d], a) : a
    }

    function dQ(a) {
        if (dp.test(a.type)) {
            a.defaultChecked = a.checked
        }
    }

    function cl(a, b) {
        return ee.nodeName(a, "table") && ee.nodeName(b.nodeType !== 11 ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function ca(a) {
        a.type = (ee.find.attr(a, "type") !== null) + "/" + a.type;
        return a
    }

    function ef(a) {
        var b = en.exec(a.type);
        if (b) {
            a.type = b[1]
        } else {
            a.removeAttribute("type")
        }
        return a
    }

    function eH(b, c) {
        var a, d = 0;
        for (; (a = b[d]) != null; d++) {
            ee._data(a, "globalEval", !c || ee._data(c[d], "globalEval"))
        }
    }

    function a7(g, j) {
        if (j.nodeType !== 1 || !ee.hasData(g)) {
            return
        }
        var a, f, c, d = ee._data(g), b = ee._data(j, d), h = d.events;
        if (h) {
            delete b.handle;
            b.events = {};
            for (a in h) {
                for (f = 0, c = h[a].length; f < c; f++) {
                    ee.event.add(j, a, h[a][f])
                }
            }
        }
        if (b.data) {
            b.data = ee.extend({}, b.data)
        }
    }

    function dU(c, a) {
        var b, d, f;
        if (a.nodeType !== 1) {
            return
        }
        b = a.nodeName.toLowerCase();
        if (!cN.noCloneEvent && a[ee.expando]) {
            f = ee._data(a);
            for (d in f.events) {
                ee.removeEvent(a, d, f.handle)
            }
            a.removeAttribute(ee.expando)
        }
        if (b === "script" && a.text !== c.text) {
            ca(a).text = c.text;
            ef(a)
        } else {
            if (b === "object") {
                if (a.parentNode) {
                    a.outerHTML = c.outerHTML
                }
                if (cN.html5Clone && (c.innerHTML && !ee.trim(a.innerHTML))) {
                    a.innerHTML = c.innerHTML
                }
            } else {
                if (b === "input" && dp.test(c.type)) {
                    a.defaultChecked = a.checked = c.checked;
                    if (a.value !== c.value) {
                        a.value = c.value
                    }
                } else {
                    if (b === "option") {
                        a.defaultSelected = a.selected = c.defaultSelected
                    } else {
                        if (b === "input" || b === "textarea") {
                            a.defaultValue = c.defaultValue
                        }
                    }
                }
            }
        }
    }

    ee.extend({
        clone: function (f, j, k) {
            var g, d, a, h, c, b = ee.contains(f.ownerDocument, f);
            if (cN.html5Clone || ee.isXMLDoc(f) || !e.test("<" + f.nodeName + ">")) {
                a = f.cloneNode(true)
            } else {
                dR.innerHTML = f.outerHTML;
                dR.removeChild(a = dR.firstChild)
            }
            if ((!cN.noCloneEvent || !cN.noCloneChecked) && (f.nodeType === 1 || f.nodeType === 11) && !ee.isXMLDoc(f)) {
                g = cu(a);
                c = cu(f);
                for (h = 0; (d = c[h]) != null; ++h) {
                    if (g[h]) {
                        dU(d, g[h])
                    }
                }
            }
            if (j) {
                if (k) {
                    c = c || cu(f);
                    g = g || cu(a);
                    for (h = 0; (d = c[h]) != null; h++) {
                        a7(d, g[h])
                    }
                } else {
                    a7(f, a)
                }
            }
            g = cu(a, "script");
            if (g.length > 0) {
                eH(g, !b && cu(f, "script"))
            }
            g = c = d = null;
            return a
        }, buildFragment: function (m, o, g, a) {
            var f, l, h, b, q, c, p, j = m.length, n = dq(o), k = [], d = 0;
            for (; d < j; d++) {
                l = m[d];
                if (l || l === 0) {
                    if (ee.type(l) === "object") {
                        ee.merge(k, l.nodeType ? [l] : l)
                    } else {
                        if (!b6.test(l)) {
                            k.push(o.createTextNode(l))
                        } else {
                            b = b || n.appendChild(o.createElement("div"));
                            q = (cn.exec(l) || ["", ""])[1].toLowerCase();
                            p = cX[q] || cX._default;
                            b.innerHTML = p[1] + l.replace(ds, "<$1></$2>") + p[2];
                            f = p[0];
                            while (f--) {
                                b = b.lastChild
                            }
                            if (!cN.leadingWhitespace && eg.test(l)) {
                                k.push(o.createTextNode(eg.exec(l)[0]))
                            }
                            if (!cN.tbody) {
                                l = q === "table" && !dw.test(l) ? b.firstChild : p[1] === "<table>" && !dw.test(l) ? b : 0;
                                f = l && l.childNodes.length;
                                while (f--) {
                                    if (ee.nodeName((c = l.childNodes[f]), "tbody") && !c.childNodes.length) {
                                        l.removeChild(c)
                                    }
                                }
                            }
                            ee.merge(k, b.childNodes);
                            b.textContent = "";
                            while (b.firstChild) {
                                b.removeChild(b.firstChild)
                            }
                            b = n.lastChild
                        }
                    }
                }
            }
            if (b) {
                n.removeChild(b)
            }
            if (!cN.appendChecked) {
                ee.grep(cu(k, "input"), dQ)
            }
            d = 0;
            while ((l = k[d++])) {
                if (a && ee.inArray(l, a) !== -1) {
                    continue
                }
                h = ee.contains(l.ownerDocument, l);
                b = cu(n.appendChild(l), "script");
                if (h) {
                    eH(b)
                }
                if (g) {
                    f = 0;
                    while ((l = b[f++])) {
                        if (cY.test(l.type || "")) {
                            g.push(l)
                        }
                    }
                }
            }
            b = null;
            return n
        }, cleanData: function (m, b) {
            var l, c, g, k, j = 0, a = ee.expando, h = ee.cache, f = cN.deleteExpando, d = ee.event.special;
            for (; (l = m[j]) != null; j++) {
                if (b || ee.acceptData(l)) {
                    g = l[a];
                    k = g && h[g];
                    if (k) {
                        if (k.events) {
                            for (c in k.events) {
                                if (d[c]) {
                                    ee.event.remove(l, c)
                                } else {
                                    ee.removeEvent(l, c, k.handle)
                                }
                            }
                        }
                        if (h[g]) {
                            delete h[g];
                            if (f) {
                                delete l[a]
                            } else {
                                if (typeof l.removeAttribute !== dW) {
                                    l.removeAttribute(a)
                                } else {
                                    l[a] = null
                                }
                            }
                            eC.push(g)
                        }
                    }
                }
            }
        }
    });
    ee.fn.extend({
        text: function (a) {
            return d3(this, function (b) {
                return b === undefined ? ee.text(this) : this.empty().append((this[0] && this[0].ownerDocument || cp).createTextNode(b))
            }, null, a, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (b) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var a = cl(this, b);
                    a.appendChild(b)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (b) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var a = cl(this, b);
                    a.insertBefore(b, a.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (a) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(a, this)
                }
            })
        }, after: function () {
            return this.domManip(arguments, function (a) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                }
            })
        }, remove: function (c, a) {
            var b, f = c ? ee.filter(c, this) : this, d = 0;
            for (; (b = f[d]) != null; d++) {
                if (!a && b.nodeType === 1) {
                    ee.cleanData(cu(b))
                }
                if (b.parentNode) {
                    if (a && ee.contains(b.ownerDocument, b)) {
                        eH(cu(b, "script"))
                    }
                    b.parentNode.removeChild(b)
                }
            }
            return this
        }, empty: function () {
            var b, a = 0;
            for (; (b = this[a]) != null; a++) {
                if (b.nodeType === 1) {
                    ee.cleanData(cu(b, false))
                }
                while (b.firstChild) {
                    b.removeChild(b.firstChild)
                }
                if (b.options && ee.nodeName(b, "select")) {
                    b.options.length = 0
                }
            }
            return this
        }, clone: function (a, b) {
            a = a == null ? false : a;
            b = b == null ? a : b;
            return this.map(function () {
                return ee.clone(this, a, b)
            })
        }, html: function (a) {
            return d3(this, function (c) {
                var d = this[0] || {}, f = 0, g = this.length;
                if (c === undefined) {
                    return d.nodeType === 1 ? d.innerHTML.replace(dl, "") : undefined
                }
                if (typeof c === "string" && !cr.test(c) && (cN.htmlSerialize || !e.test(c)) && (cN.leadingWhitespace || !eg.test(c)) && !cX[(cn.exec(c) || ["", ""])[1].toLowerCase()]) {
                    c = c.replace(ds, "<$1></$2>");
                    try {
                        for (; f < g; f++) {
                            d = this[f] || {};
                            if (d.nodeType === 1) {
                                ee.cleanData(cu(d, false));
                                d.innerHTML = c
                            }
                        }
                        d = 0
                    } catch (b) {
                    }
                }
                if (d) {
                    this.empty().append(c)
                }
            }, null, a, arguments.length)
        }, replaceWith: function () {
            var a = arguments[0];
            this.domManip(arguments, function (b) {
                a = this.parentNode;
                ee.cleanData(cu(this));
                if (a) {
                    a.replaceChild(b, this)
                }
            });
            return a && (a.length || a.nodeType) ? this : this.remove()
        }, detach: function (a) {
            return this.remove(a, true)
        }, domManip: function (g, a) {
            g = dy.apply([], g);
            var l, k, p, n, c, h, m = 0, o = this.length, d = this, b = o - 1, f = g[0], j = ee.isFunction(f);
            if (j || (o > 1 && typeof f === "string" && !cN.checkClone && cO.test(f))) {
                return this.each(function (r) {
                    var q = d.eq(r);
                    if (j) {
                        g[0] = f.call(this, r, q.html())
                    }
                    q.domManip(g, a)
                })
            }
            if (o) {
                h = ee.buildFragment(g, this[0].ownerDocument, false, this);
                l = h.firstChild;
                if (h.childNodes.length === 1) {
                    h = l
                }
                if (l) {
                    n = ee.map(cu(h, "script"), ca);
                    p = n.length;
                    for (; m < o; m++) {
                        k = h;
                        if (m !== b) {
                            k = ee.clone(k, true, true);
                            if (p) {
                                ee.merge(n, cu(k, "script"))
                            }
                        }
                        a.call(this[m], k, m)
                    }
                    if (p) {
                        c = n[n.length - 1].ownerDocument;
                        ee.map(n, ef);
                        for (m = 0; m < p; m++) {
                            k = n[m];
                            if (cY.test(k.type || "") && !ee._data(k, "globalEval") && ee.contains(c, k)) {
                                if (k.src) {
                                    if (ee._evalUrl) {
                                        ee._evalUrl(k.src)
                                    }
                                } else {
                                    ee.globalEval((k.text || k.textContent || k.innerHTML || "").replace(eF, ""))
                                }
                            }
                        }
                    }
                    h = l = null
                }
            }
            return this
        }
    });
    ee.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (b, a) {
        ee.fn[b] = function (j) {
            var h, f = 0, g = [], c = ee(j), d = c.length - 1;
            for (; f <= d; f++) {
                h = f === d ? this : this.clone(true);
                ee(c[f])[a](h);
                cw.apply(g, h.get())
            }
            return this.pushStack(g)
        }
    });
    var eA, c5 = {};

    function ck(c, b) {
        var a, f = ee(b.createElement(c)).appendTo(b.body),
            d = ch.getDefaultComputedStyle && (a = ch.getDefaultComputedStyle(f[0])) ? a.display : ee.css(f[0], "display");
        f.detach();
        return d
    }

    function db(c) {
        var a = cp, b = c5[c];
        if (!b) {
            b = ck(c, a);
            if (b === "none" || !b) {
                eA = (eA || ee("<iframe frameborder='0' width='0' height='0'/>")).appendTo(a.documentElement);
                a = (eA[0].contentWindow || eA[0].contentDocument).document;
                a.write();
                a.close();
                b = ck(c, a);
                eA.detach()
            }
            c5[c] = b
        }
        return b
    }

    (function () {
        var a;
        cN.shrinkWrapBlocks = function () {
            if (a != null) {
                return a
            }
            a = false;
            var c, b, d;
            b = cp.getElementsByTagName("body")[0];
            if (!b || !b.style) {
                return
            }
            c = cp.createElement("div");
            d = cp.createElement("div");
            d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            b.appendChild(d).appendChild(c);
            if (typeof c.style.zoom !== dW) {
                c.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1";
                c.appendChild(cp.createElement("div")).style.width = "5px";
                a = c.offsetWidth !== 3
            }
            b.removeChild(d);
            return a
        }
    })();
    var df = (/^margin/);
    var cy = new RegExp("^(" + cP + ")(?!px)[a-z%]+$", "i");
    var dk, ed, dN = /^(top|right|bottom|left)$/;
    if (ch.getComputedStyle) {
        dk = function (a) {
            if (a.ownerDocument.defaultView.opener) {
                return a.ownerDocument.defaultView.getComputedStyle(a, null)
            }
            return ch.getComputedStyle(a, null)
        };
        ed = function (g, f, b) {
            var d, h, a, c, j = g.style;
            b = b || dk(g);
            c = b ? b.getPropertyValue(f) || b[f] : undefined;
            if (b) {
                if (c === "" && !ee.contains(g.ownerDocument, g)) {
                    c = ee.style(g, f)
                }
                if (cy.test(c) && df.test(f)) {
                    d = j.width;
                    h = j.minWidth;
                    a = j.maxWidth;
                    j.minWidth = j.maxWidth = j.width = c;
                    c = b.width;
                    j.width = d;
                    j.minWidth = h;
                    j.maxWidth = a
                }
            }
            return c === undefined ? c : c + ""
        }
    } else {
        if (cp.documentElement.currentStyle) {
            dk = function (a) {
                return a.currentStyle
            };
            ed = function (b, h, a) {
                var g, f, d, j, c = b.style;
                a = a || dk(b);
                j = a ? a[h] : undefined;
                if (j == null && c && c[h]) {
                    j = c[h]
                }
                if (cy.test(j) && !dN.test(h)) {
                    g = c.left;
                    f = b.runtimeStyle;
                    d = f && f.left;
                    if (d) {
                        f.left = b.currentStyle.left
                    }
                    c.left = h === "fontSize" ? "1em" : j;
                    j = c.pixelLeft + "px";
                    c.left = g;
                    if (d) {
                        f.left = d
                    }
                }
                return j === undefined ? j : j + "" || "auto"
            }
        }
    }
    function dz(b, a) {
        return {
            get: function () {
                var c = b();
                if (c == null) {
                    return
                }
                if (c) {
                    delete this.get;
                    return
                }
                return (this.get = a).apply(this, arguments)
            }
        }
    }

    (function () {
        var g, a, h, b, j, f, d;
        g = cp.createElement("div");
        g.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        h = g.getElementsByTagName("a")[0];
        a = h && h.style;
        if (!a) {
            return
        }
        a.cssText = "float:left;opacity:.5";
        cN.opacity = a.opacity === "0.5";
        cN.cssFloat = !!a.cssFloat;
        g.style.backgroundClip = "content-box";
        g.cloneNode(true).style.backgroundClip = "";
        cN.clearCloneStyle = g.style.backgroundClip === "content-box";
        cN.boxSizing = a.boxSizing === "" || a.MozBoxSizing === "" || a.WebkitBoxSizing === "";
        ee.extend(cN, {
            reliableHiddenOffsets: function () {
                if (f == null) {
                    c()
                }
                return f
            }, boxSizingReliable: function () {
                if (j == null) {
                    c()
                }
                return j
            }, pixelPosition: function () {
                if (b == null) {
                    c()
                }
                return b
            }, reliableMarginRight: function () {
                if (d == null) {
                    c()
                }
                return d
            }
        });
        function c() {
            var l, k, n, m;
            k = cp.getElementsByTagName("body")[0];
            if (!k || !k.style) {
                return
            }
            l = cp.createElement("div");
            n = cp.createElement("div");
            n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            k.appendChild(n).appendChild(l);
            l.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
            b = j = false;
            d = true;
            if (ch.getComputedStyle) {
                b = (ch.getComputedStyle(l, null) || {}).top !== "1%";
                j = (ch.getComputedStyle(l, null) || {width: "4px"}).width === "4px";
                m = l.appendChild(cp.createElement("div"));
                m.style.cssText = l.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                m.style.marginRight = m.style.width = "0";
                l.style.width = "1px";
                d = !parseFloat((ch.getComputedStyle(m, null) || {}).marginRight);
                l.removeChild(m)
            }
            l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            m = l.getElementsByTagName("td");
            m[0].style.cssText = "margin:0;border:0;padding:0;display:none";
            f = m[0].offsetHeight === 0;
            if (f) {
                m[0].style.display = "";
                m[1].style.display = "none";
                f = m[0].offsetHeight === 0
            }
            k.removeChild(n)
        }
    })();
    ee.swap = function (f, d, c, g) {
        var h, a, b = {};
        for (a in d) {
            b[a] = f.style[a];
            f.style[a] = d[a]
        }
        h = c.apply(f, g || []);
        for (a in d) {
            f.style[a] = b[a]
        }
        return h
    };
    var c9 = /alpha\([^)]*\)/i, b9 = /opacity\s*=\s*([^)]*)/, dS = /^(none|table(?!-c[ea]).+)/,
        d0 = new RegExp("^(" + cP + ")(.*)$", "i"), dn = new RegExp("^([+-])=(" + cP + ")", "i"),
        eI = {position: "absolute", visibility: "hidden", display: "block"},
        cT = {letterSpacing: "0", fontWeight: "400"}, cE = ["Webkit", "O", "Moz", "ms"];

    function dc(c, f) {
        if (f in c) {
            return f
        }
        var a = f.charAt(0).toUpperCase() + f.slice(1), b = f, d = cE.length;
        while (d--) {
            f = cE[d] + a;
            if (f in c) {
                return f
            }
        }
        return b
    }

    function ce(b, g) {
        var f, c, a, d = [], j = 0, h = b.length;
        for (; j < h; j++) {
            c = b[j];
            if (!c.style) {
                continue
            }
            d[j] = ee._data(c, "olddisplay");
            f = c.style.display;
            if (g) {
                if (!d[j] && f === "none") {
                    c.style.display = ""
                }
                if (c.style.display === "" && cz(c)) {
                    d[j] = ee._data(c, "olddisplay", db(c.nodeName))
                }
            } else {
                a = cz(c);
                if (f && f !== "none" || !a) {
                    ee._data(c, "olddisplay", a ? f : ee.css(c, "display"))
                }
            }
        }
        for (j = 0; j < h; j++) {
            c = b[j];
            if (!c.style) {
                continue
            }
            if (!g || c.style.display === "none" || c.style.display === "") {
                c.style.display = g ? d[j] || "" : "none"
            }
        }
        return b
    }

    function eG(b, d, c) {
        var a = d0.exec(d);
        return a ? Math.max(0, a[1] - (c || 0)) + (a[2] || "px") : d
    }

    function dY(f, h, d, a, b) {
        var g = d === (a ? "border" : "content") ? 4 : h === "width" ? 1 : 0, c = 0;
        for (; g < 4; g += 2) {
            if (d === "margin") {
                c += ee.css(f, d + c7[g], true, b)
            }
            if (a) {
                if (d === "content") {
                    c -= ee.css(f, "padding" + c7[g], true, b)
                }
                if (d !== "margin") {
                    c -= ee.css(f, "border" + c7[g] + "Width", true, b)
                }
            } else {
                c += ee.css(f, "padding" + c7[g], true, b);
                if (d !== "padding") {
                    c += ee.css(f, "border" + c7[g] + "Width", true, b)
                }
            }
        }
        return c
    }

    function eq(f, a, b) {
        var g = true, d = a === "width" ? f.offsetWidth : f.offsetHeight, h = dk(f),
            c = cN.boxSizing && ee.css(f, "boxSizing", false, h) === "border-box";
        if (d <= 0 || d == null) {
            d = ed(f, a, h);
            if (d < 0 || d == null) {
                d = f.style[a]
            }
            if (cy.test(d)) {
                return d
            }
            g = c && (cN.boxSizingReliable() || d === f.style[a]);
            d = parseFloat(d) || 0
        }
        return (d + dY(f, a, b || (c ? "border" : "content"), g, h)) + "px"
    }

    ee.extend({
        cssHooks: {
            opacity: {
                get: function (c, a) {
                    if (a) {
                        var b = ed(c, "opacity");
                        return b === "" ? "1" : b
                    }
                }
            }
        },
        cssNumber: {
            columnCount: true,
            fillOpacity: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {"float": cN.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (g, l, b, f) {
            if (!g || g.nodeType === 3 || g.nodeType === 8 || !g.style) {
                return
            }
            var d, c, a, k = ee.camelCase(l), j = g.style;
            l = ee.cssProps[k] || (ee.cssProps[k] = dc(j, k));
            a = ee.cssHooks[l] || ee.cssHooks[k];
            if (b !== undefined) {
                c = typeof b;
                if (c === "string" && (d = dn.exec(b))) {
                    b = (d[1] + 1) * d[2] + parseFloat(ee.css(g, l));
                    c = "number"
                }
                if (b == null || b !== b) {
                    return
                }
                if (c === "number" && !ee.cssNumber[k]) {
                    b += "px"
                }
                if (!cN.clearCloneStyle && b === "" && l.indexOf("background") === 0) {
                    j[l] = "inherit"
                }
                if (!a || !("set" in a) || (b = a.set(g, b, f)) !== undefined) {
                    try {
                        j[l] = b
                    } catch (h) {
                    }
                }
            } else {
                if (a && "get" in a && (d = a.get(g, false, f)) !== undefined) {
                    return d
                }
                return j[l]
            }
        },
        css: function (b, g, d, a) {
            var h, f, c, j = ee.camelCase(g);
            g = ee.cssProps[j] || (ee.cssProps[j] = dc(b.style, j));
            c = ee.cssHooks[g] || ee.cssHooks[j];
            if (c && "get" in c) {
                f = c.get(b, true, d)
            }
            if (f === undefined) {
                f = ed(b, g, a)
            }
            if (f === "normal" && g in cT) {
                f = cT[g]
            }
            if (d === "" || d) {
                h = parseFloat(f);
                return d === true || ee.isNumeric(h) ? h || 0 : f
            }
            return f
        }
    });
    ee.each(["height", "width"], function (b, a) {
        ee.cssHooks[a] = {
            get: function (d, f, c) {
                if (f) {
                    return dS.test(ee.css(d, "display")) && d.offsetWidth === 0 ? ee.swap(d, eI, function () {
                        return eq(d, a, c)
                    }) : eq(d, a, c)
                }
            }, set: function (f, d, c) {
                var g = c && dk(f);
                return eG(f, d, c ? dY(f, a, c, cN.boxSizing && ee.css(f, "boxSizing", false, g) === "border-box", g) : 0)
            }
        }
    });
    if (!cN.opacity) {
        ee.cssHooks.opacity = {
            get: function (a, b) {
                return b9.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : b ? "1" : ""
            }, set: function (d, b) {
                var f = d.style, a = d.currentStyle, c = ee.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                    g = a && a.filter || f.filter || "";
                f.zoom = 1;
                if ((b >= 1 || b === "") && ee.trim(g.replace(c9, "")) === "" && f.removeAttribute) {
                    f.removeAttribute("filter");
                    if (b === "" || a && !a.filter) {
                        return
                    }
                }
                f.filter = c9.test(g) ? g.replace(c9, c) : g + " " + c
            }
        }
    }
    ee.cssHooks.marginRight = dz(cN.reliableMarginRight, function (a, b) {
        if (b) {
            return ee.swap(a, {display: "inline-block"}, ed, [a, "marginRight"])
        }
    });
    ee.each({margin: "", padding: "", border: "Width"}, function (b, a) {
        ee.cssHooks[b + a] = {
            expand: function (d) {
                var f = 0, g = {}, c = typeof d === "string" ? d.split(" ") : [d];
                for (; f < 4; f++) {
                    g[b + c7[f] + a] = c[f] || c[f - 2] || c[0]
                }
                return g
            }
        };
        if (!df.test(b)) {
            ee.cssHooks[b + a].set = eG
        }
    });
    ee.fn.extend({
        css: function (b, a) {
            return d3(this, function (f, j, d) {
                var g, k, c = {}, h = 0;
                if (ee.isArray(j)) {
                    g = dk(f);
                    k = j.length;
                    for (; h < k; h++) {
                        c[j[h]] = ee.css(f, j[h], false, g)
                    }
                    return c
                }
                return d !== undefined ? ee.style(f, j, d) : ee.css(f, j)
            }, b, a, arguments.length > 1)
        }, show: function () {
            return ce(this, true)
        }, hide: function () {
            return ce(this)
        }, toggle: function (a) {
            if (typeof a === "boolean") {
                return a ? this.show() : this.hide()
            }
            return this.each(function () {
                if (cz(this)) {
                    ee(this).show()
                } else {
                    ee(this).hide()
                }
            })
        }
    });
    function ec(f, a, c, b, d) {
        return new ec.prototype.init(f, a, c, b, d)
    }

    ee.Tween = ec;
    ec.prototype = {
        constructor: ec, init: function (f, a, d, b, c, g) {
            this.elem = f;
            this.prop = d;
            this.easing = c || "swing";
            this.options = a;
            this.start = this.now = this.cur();
            this.end = b;
            this.unit = g || (ee.cssNumber[d] ? "" : "px")
        }, cur: function () {
            var a = ec.propHooks[this.prop];
            return a && a.get ? a.get(this) : ec.propHooks._default.get(this)
        }, run: function (c) {
            var a, b = ec.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = a = ee.easing[this.easing](c, this.options.duration * c, 0, 1, this.options.duration)
            } else {
                this.pos = a = c
            }
            this.now = (this.end - this.start) * a + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            if (b && b.set) {
                b.set(this)
            } else {
                ec.propHooks._default.set(this)
            }
            return this
        }
    };
    ec.prototype.init.prototype = ec.prototype;
    ec.propHooks = {
        _default: {
            get: function (a) {
                var b;
                if (a.elem[a.prop] != null && (!a.elem.style || a.elem.style[a.prop] == null)) {
                    return a.elem[a.prop]
                }
                b = ee.css(a.elem, a.prop, "");
                return !b || b === "auto" ? 0 : b
            }, set: function (a) {
                if (ee.fx.step[a.prop]) {
                    ee.fx.step[a.prop](a)
                } else {
                    if (a.elem.style && (a.elem.style[ee.cssProps[a.prop]] != null || ee.cssHooks[a.prop])) {
                        ee.style(a.elem, a.prop, a.now + a.unit)
                    } else {
                        a.elem[a.prop] = a.now
                    }
                }
            }
        }
    };
    ec.propHooks.scrollTop = ec.propHooks.scrollLeft = {
        set: function (a) {
            if (a.elem.nodeType && a.elem.parentNode) {
                a.elem[a.prop] = a.now
            }
        }
    };
    ee.easing = {
        linear: function (a) {
            return a
        }, swing: function (a) {
            return 0.5 - Math.cos(a * Math.PI) / 2
        }
    };
    ee.fx = ec.prototype.init;
    ee.fx.step = {};
    var dj, d5, et = /^(?:toggle|show|hide)$/, i = new RegExp("^(?:([+-])=|)(" + cP + ")([a-z%]*)$", "i"),
        ci = /queueHooks$/, dD = [d6], co = {
            "*": [function (k, c) {
                var a = this.createTween(k, c), j = a.cur(), d = i.exec(c), b = d && d[3] || (ee.cssNumber[k] ? "" : "px"),
                    g = (ee.cssNumber[k] || b !== "px" && +j) && i.exec(ee.css(a.elem, k)), f = 1, h = 20;
                if (g && g[3] !== b) {
                    b = b || g[3];
                    d = d || [];
                    g = +j || 1;
                    do {
                        f = f || ".5";
                        g = g / f;
                        ee.style(a.elem, k, g + b)
                    } while (f !== (f = a.cur() / j) && f !== 1 && --h)
                }
                if (d) {
                    g = a.start = +g || +j || 0;
                    a.unit = b;
                    a.end = d[1] ? g + (d[1] + 1) * d[2] : +d[2]
                }
                return a
            }]
        };

    function d1() {
        setTimeout(function () {
            dj = undefined
        });
        return (dj = ee.now())
    }

    function dK(d, a) {
        var c, b = {height: d}, f = 0;
        a = a ? 1 : 0;
        for (; f < 4; f += 2 - a) {
            c = c7[f];
            b["margin" + c] = b["padding" + c] = d
        }
        if (a) {
            b.opacity = b.width = d
        }
        return b
    }

    function cB(f, c, g) {
        var a, d = (co[c] || []).concat(co["*"]), b = 0, h = d.length;
        for (; b < h; b++) {
            if ((a = d[b].call(g, c, f))) {
                return a
            }
        }
    }

    function d6(o, f, k) {
        var p, b, m, q, l, a, g, c, n = this, d = {}, j = o.style, h = o.nodeType && cz(o), r = ee._data(o, "fxshow");
        if (!k.queue) {
            l = ee._queueHooks(o, "fx");
            if (l.unqueued == null) {
                l.unqueued = 0;
                a = l.empty.fire;
                l.empty.fire = function () {
                    if (!l.unqueued) {
                        a()
                    }
                }
            }
            l.unqueued++;
            n.always(function () {
                n.always(function () {
                    l.unqueued--;
                    if (!ee.queue(o, "fx").length) {
                        l.empty.fire()
                    }
                })
            })
        }
        if (o.nodeType === 1 && ("height" in f || "width" in f)) {
            k.overflow = [j.overflow, j.overflowX, j.overflowY];
            g = ee.css(o, "display");
            c = g === "none" ? ee._data(o, "olddisplay") || db(o.nodeName) : g;
            if (c === "inline" && ee.css(o, "float") === "none") {
                if (!cN.inlineBlockNeedsLayout || db(o.nodeName) === "inline") {
                    j.display = "inline-block"
                } else {
                    j.zoom = 1
                }
            }
        }
        if (k.overflow) {
            j.overflow = "hidden";
            if (!cN.shrinkWrapBlocks()) {
                n.always(function () {
                    j.overflow = k.overflow[0];
                    j.overflowX = k.overflow[1];
                    j.overflowY = k.overflow[2]
                })
            }
        }
        for (p in f) {
            b = f[p];
            if (et.exec(b)) {
                delete f[p];
                m = m || b === "toggle";
                if (b === (h ? "hide" : "show")) {
                    if (b === "show" && r && r[p] !== undefined) {
                        h = true
                    } else {
                        continue
                    }
                }
                d[p] = r && r[p] || ee.style(o, p)
            } else {
                g = undefined
            }
        }
        if (!ee.isEmptyObject(d)) {
            if (r) {
                if ("hidden" in r) {
                    h = r.hidden
                }
            } else {
                r = ee._data(o, "fxshow", {})
            }
            if (m) {
                r.hidden = !h
            }
            if (h) {
                ee(o).show()
            } else {
                n.done(function () {
                    ee(o).hide()
                })
            }
            n.done(function () {
                var s;
                ee._removeData(o, "fxshow");
                for (s in d) {
                    ee.style(o, s, d[s])
                }
            });
            for (p in d) {
                q = cB(h ? r[p] : 0, p, n);
                if (!(p in r)) {
                    r[p] = q.start;
                    if (h) {
                        q.end = q.start;
                        q.start = p === "width" || p === "height" ? 1 : 0
                    }
                }
            }
        } else {
            if ((g === "none" ? db(o.nodeName) : g) === "inline") {
                j.display = g
            }
        }
    }

    function cm(g, f) {
        var h, a, d, c, b;
        for (h in g) {
            a = ee.camelCase(h);
            d = f[a];
            c = g[h];
            if (ee.isArray(c)) {
                d = c[1];
                c = g[h] = c[0]
            }
            if (h !== a) {
                g[a] = c;
                delete g[h]
            }
            b = ee.cssHooks[a];
            if (b && "expand" in b) {
                c = b.expand(c);
                delete g[a];
                for (h in c) {
                    if (!(h in g)) {
                        g[h] = c[h];
                        f[h] = d
                    }
                }
            } else {
                f[a] = d
            }
        }
    }

    function c0(h, g, b) {
        var a, m, k = 0, j = dD.length, c = ee.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (m) {
                return false
            }
            var n = dj || d1(), q = Math.max(0, f.startTime + f.duration - n), s = q / f.duration || 0, o = 1 - s,
                r = 0, p = f.tweens.length;
            for (; r < p; r++) {
                f.tweens[r].run(o)
            }
            c.notifyWith(h, [f, o, q]);
            if (o < 1 && p) {
                return q
            } else {
                c.resolveWith(h, [f]);
                return false
            }
        }, f = c.promise({
            elem: h,
            props: ee.extend({}, g),
            opts: ee.extend(true, {specialEasing: {}}, b),
            originalProperties: g,
            originalOptions: b,
            startTime: dj || d1(),
            duration: b.duration,
            tweens: [],
            createTween: function (n, p) {
                var o = ee.Tween(h, f.opts, n, p, f.opts.specialEasing[n] || f.opts.easing);
                f.tweens.push(o);
                return o
            },
            stop: function (o) {
                var p = 0, n = o ? f.tweens.length : 0;
                if (m) {
                    return this
                }
                m = true;
                for (; p < n; p++) {
                    f.tweens[p].run(1)
                }
                if (o) {
                    c.resolveWith(h, [f, o])
                } else {
                    c.rejectWith(h, [f, o])
                }
                return this
            }
        }), d = f.props;
        cm(d, f.opts.specialEasing);
        for (; k < j; k++) {
            a = dD[k].call(f, h, d, f.opts);
            if (a) {
                return a
            }
        }
        ee.map(d, cB, f);
        if (ee.isFunction(f.opts.start)) {
            f.opts.start.call(h, f)
        }
        ee.fx.timer(ee.extend(l, {elem: h, anim: f, queue: f.opts.queue}));
        return f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    ee.Animation = ee.extend(c0, {
        tweener: function (a, c) {
            if (ee.isFunction(a)) {
                c = a;
                a = ["*"]
            } else {
                a = a.split(" ")
            }
            var d, b = 0, f = a.length;
            for (; b < f; b++) {
                d = a[b];
                co[d] = co[d] || [];
                co[d].unshift(c)
            }
        }, prefilter: function (a, b) {
            if (b) {
                dD.unshift(a)
            } else {
                dD.push(a)
            }
        }
    });
    ee.speed = function (d, c, a) {
        var b = d && typeof d === "object" ? ee.extend({}, d) : {
            complete: a || !a && c || ee.isFunction(d) && d,
            duration: d,
            easing: a && c || c && !ee.isFunction(c) && c
        };
        b.duration = ee.fx.off ? 0 : typeof b.duration === "number" ? b.duration : b.duration in ee.fx.speeds ? ee.fx.speeds[b.duration] : ee.fx.speeds._default;
        if (b.queue == null || b.queue === true) {
            b.queue = "fx"
        }
        b.old = b.complete;
        b.complete = function () {
            if (ee.isFunction(b.old)) {
                b.old.call(this)
            }
            if (b.queue) {
                ee.dequeue(this, b.queue)
            }
        };
        return b
    };
    ee.fn.extend({
        fadeTo: function (b, c, d, a) {
            return this.filter(cz).css("opacity", 0).show().end().animate({opacity: c}, b, d, a)
        }, animate: function (f, g, d, c) {
            var h = ee.isEmptyObject(f), b = ee.speed(g, d, c), a = function () {
                var j = c0(this, ee.extend({}, f), b);
                if (h || ee._data(this, "finish")) {
                    j.stop(true)
                }
            };
            a.finish = a;
            return h || b.queue === false ? this.each(a) : this.queue(b.queue, a)
        }, stop: function (d, a, b) {
            var c = function (g) {
                var f = g.stop;
                delete g.stop;
                f(b)
            };
            if (typeof d !== "string") {
                b = a;
                a = d;
                d = undefined
            }
            if (a && d !== false) {
                this.queue(d || "fx", [])
            }
            return this.each(function () {
                var f = true, j = d != null && d + "queueHooks", g = ee.timers, h = ee._data(this);
                if (j) {
                    if (h[j] && h[j].stop) {
                        c(h[j])
                    }
                } else {
                    for (j in h) {
                        if (h[j] && h[j].stop && ci.test(j)) {
                            c(h[j])
                        }
                    }
                }
                for (j = g.length; j--;) {
                    if (g[j].elem === this && (d == null || g[j].queue === d)) {
                        g[j].anim.stop(b);
                        f = false;
                        g.splice(j, 1)
                    }
                }
                if (f || !b) {
                    ee.dequeue(this, d)
                }
            })
        }, finish: function (a) {
            if (a !== false) {
                a = a || "fx"
            }
            return this.each(function () {
                var g, c = ee._data(this), h = c[a + "queue"], b = c[a + "queueHooks"], d = ee.timers,
                    f = h ? h.length : 0;
                c.finish = true;
                ee.queue(this, a, []);
                if (b && b.stop) {
                    b.stop.call(this, true)
                }
                for (g = d.length; g--;) {
                    if (d[g].elem === this && d[g].queue === a) {
                        d[g].anim.stop(true);
                        d.splice(g, 1)
                    }
                }
                for (g = 0; g < f; g++) {
                    if (h[g] && h[g].finish) {
                        h[g].finish.call(this)
                    }
                }
                delete c.finish
            })
        }
    });
    ee.each(["toggle", "show", "hide"], function (c, a) {
        var b = ee.fn[a];
        ee.fn[a] = function (d, f, g) {
            return d == null || typeof d === "boolean" ? b.apply(this, arguments) : this.animate(dK(a, true), d, f, g)
        }
    });
    ee.each({
        slideDown: dK("show"),
        slideUp: dK("hide"),
        slideToggle: dK("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (b, a) {
        ee.fn[b] = function (f, c, d) {
            return this.animate(a, f, c, d)
        }
    });
    ee.timers = [];
    ee.fx.tick = function () {
        var b, c = ee.timers, a = 0;
        dj = ee.now();
        for (; a < c.length; a++) {
            b = c[a];
            if (!b() && c[a] === b) {
                c.splice(a--, 1)
            }
        }
        if (!c.length) {
            ee.fx.stop()
        }
        dj = undefined
    };
    ee.fx.timer = function (a) {
        ee.timers.push(a);
        if (a()) {
            ee.fx.start()
        } else {
            ee.timers.pop()
        }
    };
    ee.fx.interval = 13;
    ee.fx.start = function () {
        if (!d5) {
            d5 = setInterval(ee.fx.tick, ee.fx.interval)
        }
    };
    ee.fx.stop = function () {
        clearInterval(d5);
        d5 = null
    };
    ee.fx.speeds = {slow: 600, fast: 200, _default: 400};
    ee.fn.delay = function (a, b) {
        a = ee.fx ? ee.fx.speeds[a] || a : a;
        b = b || "fx";
        return this.queue(b, function (d, f) {
            var c = setTimeout(d, a);
            f.stop = function () {
                clearTimeout(c)
            }
        })
    };
    (function () {
        var f, c, b, a, d;
        c = cp.createElement("div");
        c.setAttribute("className", "t");
        c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = c.getElementsByTagName("a")[0];
        b = cp.createElement("select");
        d = b.appendChild(cp.createElement("option"));
        f = c.getElementsByTagName("input")[0];
        a.style.cssText = "top:1px";
        cN.getSetAttribute = c.className !== "t";
        cN.style = /top/.test(a.getAttribute("style"));
        cN.hrefNormalized = a.getAttribute("href") === "/a";
        cN.checkOn = !!f.value;
        cN.optSelected = d.selected;
        cN.enctype = !!cp.createElement("form").enctype;
        b.disabled = true;
        cN.optDisabled = !d.disabled;
        f = cp.createElement("input");
        f.setAttribute("value", "");
        cN.input = f.getAttribute("value") === "";
        f.value = "t";
        f.setAttribute("type", "radio");
        cN.radioValue = f.value === "t"
    })();
    var d2 = /\r/g;
    ee.fn.extend({
        val: function (d) {
            var c, a, b, f = this[0];
            if (!arguments.length) {
                if (f) {
                    c = ee.valHooks[f.type] || ee.valHooks[f.nodeName.toLowerCase()];
                    if (c && "get" in c && (a = c.get(f, "value")) !== undefined) {
                        return a
                    }
                    a = f.value;
                    return typeof a === "string" ? a.replace(d2, "") : a == null ? "" : a
                }
                return
            }
            b = ee.isFunction(d);
            return this.each(function (h) {
                var g;
                if (this.nodeType !== 1) {
                    return
                }
                if (b) {
                    g = d.call(this, h, ee(this).val())
                } else {
                    g = d
                }
                if (g == null) {
                    g = ""
                } else {
                    if (typeof g === "number") {
                        g += ""
                    } else {
                        if (ee.isArray(g)) {
                            g = ee.map(g, function (j) {
                                return j == null ? "" : j + ""
                            })
                        }
                    }
                }
                c = ee.valHooks[this.type] || ee.valHooks[this.nodeName.toLowerCase()];
                if (!c || !("set" in c) || c.set(this, g, "value") === undefined) {
                    this.value = g
                }
            })
        }
    });
    ee.extend({
        valHooks: {
            option: {
                get: function (b) {
                    var a = ee.find.attr(b, "value");
                    return a != null ? a : ee.trim(ee.text(b))
                }
            }, select: {
                get: function (k) {
                    var f, d, a = k.options, h = k.selectedIndex, j = k.type === "select-one" || h < 0,
                        b = j ? null : [], g = j ? h + 1 : a.length, c = h < 0 ? g : j ? h : 0;
                    for (; c < g; c++) {
                        d = a[c];
                        if ((d.selected || c === h) && (cN.optDisabled ? !d.disabled : d.getAttribute("disabled") === null) && (!d.parentNode.disabled || !ee.nodeName(d.parentNode, "optgroup"))) {
                            f = ee(d).val();
                            if (j) {
                                return f
                            }
                            b.push(f)
                        }
                    }
                    return b
                }, set: function (b, g) {
                    var f, a, h = b.options, d = ee.makeArray(g), c = h.length;
                    while (c--) {
                        a = h[c];
                        if (ee.inArray(ee.valHooks.option.get(a), d) >= 0) {
                            try {
                                a.selected = f = true
                            } catch (j) {
                                a.scrollHeight
                            }
                        } else {
                            a.selected = false
                        }
                    }
                    if (!f) {
                        b.selectedIndex = -1
                    }
                    return h
                }
            }
        }
    });
    ee.each(["radio", "checkbox"], function () {
        ee.valHooks[this] = {
            set: function (b, a) {
                if (ee.isArray(a)) {
                    return (b.checked = ee.inArray(ee(b).val(), a) >= 0)
                }
            }
        };
        if (!cN.checkOn) {
            ee.valHooks[this].get = function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    });
    var d8, eu, cs = ee.expr.attrHandle, cb = /^(?:checked|selected)$/i, dO = cN.getSetAttribute, ea = cN.input;
    ee.fn.extend({
        attr: function (b, a) {
            return d3(this, ee.attr, b, a, arguments.length > 1)
        }, removeAttr: function (a) {
            return this.each(function () {
                ee.removeAttr(this, a)
            })
        }
    });
    ee.extend({
        attr: function (d, f, b) {
            var c, g, a = d.nodeType;
            if (!d || a === 3 || a === 8 || a === 2) {
                return
            }
            if (typeof d.getAttribute === dW) {
                return ee.prop(d, f, b)
            }
            if (a !== 1 || !ee.isXMLDoc(d)) {
                f = f.toLowerCase();
                c = ee.attrHooks[f] || (ee.expr.match.bool.test(f) ? eu : d8)
            }
            if (b !== undefined) {
                if (b === null) {
                    ee.removeAttr(d, f)
                } else {
                    if (c && "set" in c && (g = c.set(d, b, f)) !== undefined) {
                        return g
                    } else {
                        d.setAttribute(f, b + "");
                        return b
                    }
                }
            } else {
                if (c && "get" in c && (g = c.get(d, f)) !== null) {
                    return g
                } else {
                    g = ee.find.attr(d, f);
                    return g == null ? undefined : g
                }
            }
        }, removeAttr: function (f, d) {
            var b, c, g = 0, a = d && d.match(cF);
            if (a && f.nodeType === 1) {
                while ((b = a[g++])) {
                    c = ee.propFix[b] || b;
                    if (ee.expr.match.bool.test(b)) {
                        if (ea && dO || !cb.test(b)) {
                            f[c] = false
                        } else {
                            f[ee.camelCase("default-" + b)] = f[c] = false
                        }
                    } else {
                        ee.attr(f, b, "")
                    }
                    f.removeAttribute(dO ? b : c)
                }
            }
        }, attrHooks: {
            type: {
                set: function (b, a) {
                    if (!cN.radioValue && a === "radio" && ee.nodeName(b, "input")) {
                        var c = b.value;
                        b.setAttribute("type", a);
                        if (c) {
                            b.value = c
                        }
                        return a
                    }
                }
            }
        }
    });
    eu = {
        set: function (a, c, b) {
            if (c === false) {
                ee.removeAttr(a, b)
            } else {
                if (ea && dO || !cb.test(b)) {
                    a.setAttribute(!dO && ee.propFix[b] || b, b)
                } else {
                    a[ee.camelCase("default-" + b)] = a[b] = true
                }
            }
            return b
        }
    };
    ee.each(ee.expr.match.bool.source.match(/\w+/g), function (b, c) {
        var a = cs[c] || ee.find.attr;
        cs[c] = ea && dO || !cb.test(c) ? function (h, j, d) {
            var f, g;
            if (!d) {
                g = cs[j];
                cs[j] = f;
                f = a(h, j, d) != null ? j.toLowerCase() : null;
                cs[j] = g
            }
            return f
        } : function (g, d, f) {
            if (!f) {
                return g[ee.camelCase("default-" + d)] ? d.toLowerCase() : null
            }
        }
    });
    if (!ea || !dO) {
        ee.attrHooks.value = {
            set: function (a, c, b) {
                if (ee.nodeName(a, "input")) {
                    a.defaultValue = c
                } else {
                    return d8 && d8.set(a, c, b)
                }
            }
        }
    }
    if (!dO) {
        d8 = {
            set: function (d, c, a) {
                var b = d.getAttributeNode(a);
                if (!b) {
                    d.setAttributeNode((b = d.ownerDocument.createAttribute(a)))
                }
                b.value = c += "";
                if (a === "value" || c === d.getAttribute(a)) {
                    return c
                }
            }
        };
        cs.id = cs.name = cs.coords = function (d, a, c) {
            var b;
            if (!c) {
                return (b = d.getAttributeNode(a)) && b.value !== "" ? b.value : null
            }
        };
        ee.valHooks.button = {
            get: function (c, a) {
                var b = c.getAttributeNode(a);
                if (b && b.specified) {
                    return b.value
                }
            }, set: d8.set
        };
        ee.attrHooks.contenteditable = {
            set: function (a, c, b) {
                d8.set(a, c === "" ? false : c, b)
            }
        };
        ee.each(["width", "height"], function (b, a) {
            ee.attrHooks[a] = {
                set: function (c, d) {
                    if (d === "") {
                        c.setAttribute(a, "auto");
                        return d
                    }
                }
            }
        })
    }
    if (!cN.style) {
        ee.attrHooks.style = {
            get: function (a) {
                return a.style.cssText || undefined
            }, set: function (b, a) {
                return (b.style.cssText = a + "")
            }
        }
    }
    var ew = /^(?:input|select|textarea|button|object)$/i, cA = /^(?:a|area)$/i;
    ee.fn.extend({
        prop: function (b, a) {
            return d3(this, ee.prop, b, a, arguments.length > 1)
        }, removeProp: function (a) {
            a = ee.propFix[a] || a;
            return this.each(function () {
                try {
                    this[a] = undefined;
                    delete this[a]
                } catch (b) {
                }
            })
        }
    });
    ee.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (f, g, d) {
            var h, c, b, a = f.nodeType;
            if (!f || a === 3 || a === 8 || a === 2) {
                return
            }
            b = a !== 1 || !ee.isXMLDoc(f);
            if (b) {
                g = ee.propFix[g] || g;
                c = ee.propHooks[g]
            }
            if (d !== undefined) {
                return c && "set" in c && (h = c.set(f, d, g)) !== undefined ? h : (f[g] = d)
            } else {
                return c && "get" in c && (h = c.get(f, g)) !== null ? h : f[g]
            }
        }, propHooks: {
            tabIndex: {
                get: function (a) {
                    var b = ee.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : ew.test(a.nodeName) || cA.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    });
    if (!cN.hrefNormalized) {
        ee.each(["href", "src"], function (b, a) {
            ee.propHooks[a] = {
                get: function (c) {
                    return c.getAttribute(a, 4)
                }
            }
        })
    }
    if (!cN.optSelected) {
        ee.propHooks.selected = {
            get: function (a) {
                var b = a.parentNode;
                if (b) {
                    b.selectedIndex;
                    if (b.parentNode) {
                        b.parentNode.selectedIndex
                    }
                }
                return null
            }
        }
    }
    ee.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        ee.propFix[this.toLowerCase()] = this
    });
    if (!cN.enctype) {
        ee.propFix.enctype = "encoding"
    }
    var cI = /[\t\r\n\f]/g;
    ee.fn.extend({
        addClass: function (b) {
            var f, g, a, d, k, l, j = 0, h = this.length, c = typeof b === "string" && b;
            if (ee.isFunction(b)) {
                return this.each(function (m) {
                    ee(this).addClass(b.call(this, m, this.className))
                })
            }
            if (c) {
                f = (b || "").match(cF) || [];
                for (; j < h; j++) {
                    g = this[j];
                    a = g.nodeType === 1 && (g.className ? (" " + g.className + " ").replace(cI, " ") : " ");
                    if (a) {
                        k = 0;
                        while ((d = f[k++])) {
                            if (a.indexOf(" " + d + " ") < 0) {
                                a += d + " "
                            }
                        }
                        l = ee.trim(a);
                        if (g.className !== l) {
                            g.className = l
                        }
                    }
                }
            }
            return this
        }, removeClass: function (b) {
            var f, g, a, d, k, l, j = 0, h = this.length, c = arguments.length === 0 || typeof b === "string" && b;
            if (ee.isFunction(b)) {
                return this.each(function (m) {
                    ee(this).removeClass(b.call(this, m, this.className))
                })
            }
            if (c) {
                f = (b || "").match(cF) || [];
                for (; j < h; j++) {
                    g = this[j];
                    a = g.nodeType === 1 && (g.className ? (" " + g.className + " ").replace(cI, " ") : "");
                    if (a) {
                        k = 0;
                        while ((d = f[k++])) {
                            while (a.indexOf(" " + d + " ") >= 0) {
                                a = a.replace(" " + d + " ", " ")
                            }
                        }
                        l = b ? ee.trim(a) : "";
                        if (g.className !== l) {
                            g.className = l
                        }
                    }
                }
            }
            return this
        }, toggleClass: function (c, b) {
            var a = typeof c;
            if (typeof b === "boolean" && a === "string") {
                return b ? this.addClass(c) : this.removeClass(c)
            }
            if (ee.isFunction(c)) {
                return this.each(function (d) {
                    ee(this).toggleClass(c.call(this, d, this.className, b), b)
                })
            }
            return this.each(function () {
                if (a === "string") {
                    var f, g = 0, h = ee(this), d = c.match(cF) || [];
                    while ((f = d[g++])) {
                        if (h.hasClass(f)) {
                            h.removeClass(f)
                        } else {
                            h.addClass(f)
                        }
                    }
                } else {
                    if (a === dW || a === "boolean") {
                        if (this.className) {
                            ee._data(this, "__className__", this.className)
                        }
                        this.className = this.className || c === false ? "" : ee._data(this, "__className__") || ""
                    }
                }
            })
        }, hasClass: function (b) {
            var a = " " + b + " ", c = 0, d = this.length;
            for (; c < d; c++) {
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(cI, " ").indexOf(a) >= 0) {
                    return true
                }
            }
            return false
        }
    });
    ee.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "), function (b, a) {
        ee.fn[a] = function (d, c) {
            return arguments.length > 0 ? this.on(a, null, d, c) : this.trigger(a)
        }
    });
    ee.fn.extend({
        hover: function (b, a) {
            return this.mouseenter(b).mouseleave(a || b)
        }, bind: function (b, c, a) {
            return this.on(b, null, c, a)
        }, unbind: function (b, a) {
            return this.off(b, null, a)
        }, delegate: function (b, a, c, d) {
            return this.on(a, b, c, d)
        }, undelegate: function (b, a, c) {
            return arguments.length === 1 ? this.off(b, "**") : this.off(a, b || "**", c)
        }
    });
    var dI = ee.now();
    var cd = (/\?/);
    var cq = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ee.parseJSON = function (b) {
        if (ch.JSON && ch.JSON.parse) {
            return ch.JSON.parse(b + "")
        }
        var c, d = null, a = ee.trim(b + "");
        return a && !ee.trim(a.replace(cq, function (g, j, h, f) {
            if (c && j) {
                d = 0
            }
            if (d === 0) {
                return g
            }
            c = h || j;
            d += !f - !h;
            return ""
        })) ? (Function("return " + a))() : ee.error("Invalid JSON: " + b)
    };
    ee.parseXML = function (c) {
        var a, d;
        if (!c || typeof c !== "string") {
            return null
        }
        try {
            if (ch.DOMParser) {
                d = new DOMParser();
                a = d.parseFromString(c, "text/xml")
            } else {
                a = new ActiveXObject("Microsoft.XMLDOM");
                a.async = "false";
                a.loadXML(c)
            }
        } catch (b) {
            a = undefined
        }
        if (!a || !a.documentElement || a.getElementsByTagName("parsererror").length) {
            ee.error("Invalid XML: " + c)
        }
        return a
    };
    var el, eE, cg = /#.*$/, cR = /([?&])_=[^&]*/, dm = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        cV = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, cf = /^(?:GET|HEAD)$/, dv = /^\/\//,
        b7 = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, em = {}, dE = {}, a8 = "*/".concat("*");
    try {
        eE = location.href
    } catch (da) {
        eE = cp.createElement("a");
        eE.href = "";
        eE = eE.href
    }
    el = b7.exec(eE.toLowerCase()) || [];
    function de(a) {
        return function (c, b) {
            if (typeof c !== "string") {
                b = c;
                c = "*"
            }
            var g, f = 0, d = c.toLowerCase().match(cF) || [];
            if (ee.isFunction(b)) {
                while ((g = d[f++])) {
                    if (g.charAt(0) === "+") {
                        g = g.slice(1) || "*";
                        (a[g] = a[g] || []).unshift(b)
                    } else {
                        (a[g] = a[g] || []).push(b)
                    }
                }
            }
        }
    }

    function cj(f, h, c, g) {
        var a = {}, b = (f === dE);

        function d(k) {
            var j;
            a[k] = true;
            ee.each(f[k] || [], function (l, m) {
                var n = m(h, c, g);
                if (typeof n === "string" && !b && !a[n]) {
                    h.dataTypes.unshift(n);
                    d(n);
                    return false
                } else {
                    if (b) {
                        return !(j = n)
                    }
                }
            });
            return j
        }

        return d(h.dataTypes[0]) || !a["*"] && d("*")
    }

    function cc(f, d) {
        var c, a, b = ee.ajaxSettings.flatOptions || {};
        for (a in d) {
            if (d[a] !== undefined) {
                (b[a] ? f : (c || (c = {})))[a] = d[a]
            }
        }
        if (c) {
            ee.extend(true, f, c)
        }
        return f
    }

    function cH(a, b, j) {
        var k, d, f, h, g = a.contents, c = a.dataTypes;
        while (c[0] === "*") {
            c.shift();
            if (d === undefined) {
                d = a.mimeType || b.getResponseHeader("Content-Type")
            }
        }
        if (d) {
            for (h in g) {
                if (g[h] && g[h].test(d)) {
                    c.unshift(h);
                    break
                }
            }
        }
        if (c[0] in j) {
            f = c[0]
        } else {
            for (h in j) {
                if (!c[0] || a.converters[h + " " + c[0]]) {
                    f = h;
                    break
                }
                if (!k) {
                    k = h
                }
            }
            f = f || k
        }
        if (f) {
            if (f !== c[0]) {
                c.unshift(f)
            }
            return j[f]
        }
    }

    function dL(a, h, d, n) {
        var l, j, c, m, g, b = {}, f = a.dataTypes.slice();
        if (f[1]) {
            for (c in a.converters) {
                b[c.toLowerCase()] = a.converters[c]
            }
        }
        j = f.shift();
        while (j) {
            if (a.responseFields[j]) {
                d[a.responseFields[j]] = h
            }
            if (!g && n && a.dataFilter) {
                h = a.dataFilter(h, a.dataType)
            }
            g = j;
            j = f.shift();
            if (j) {
                if (j === "*") {
                    j = g
                } else {
                    if (g !== "*" && g !== j) {
                        c = b[g + " " + j] || b["* " + j];
                        if (!c) {
                            for (l in b) {
                                m = l.split(" ");
                                if (m[1] === j) {
                                    c = b[g + " " + m[0]] || b["* " + m[0]];
                                    if (c) {
                                        if (c === true) {
                                            c = b[l]
                                        } else {
                                            if (b[l] !== true) {
                                                j = m[0];
                                                f.unshift(m[1])
                                            }
                                        }
                                        break
                                    }
                                }
                            }
                        }
                        if (c !== true) {
                            if (c && a["throws"]) {
                                h = c(h)
                            } else {
                                try {
                                    h = c(h)
                                } catch (k) {
                                    return {state: "parsererror", error: c ? k : "No conversion from " + g + " to " + j}
                                }
                            }
                        }
                    }
                }
            }
        }
        return {state: "success", data: h}
    }

    ee.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: eE,
            type: "GET",
            isLocal: cV.test(el[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": a8,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": true, "text json": ee.parseJSON, "text xml": ee.parseXML},
            flatOptions: {url: true, context: true}
        },
        ajaxSetup: function (a, b) {
            return b ? cc(cc(a, ee.ajaxSettings), b) : cc(ee.ajaxSettings, a)
        },
        ajaxPrefilter: de(em),
        ajaxTransport: de(dE),
        ajax: function (m, p) {
            if (typeof m === "object") {
                p = m;
                m = undefined
            }
            p = p || {};
            var d, b, y, t, j, q, a, o, k = ee.ajaxSetup({}, p), r = k.context || k,
                g = k.context && (r.nodeType || r.jquery) ? ee(r) : ee.event, s = ee.Deferred(),
                v = ee.Callbacks("once memory"), x = k.statusCode || {}, f = {}, u = {}, n = 0, l = "canceled", c = {
                    readyState: 0, getResponseHeader: function (z) {
                        var A;
                        if (n === 2) {
                            if (!o) {
                                o = {};
                                while ((A = dm.exec(t))) {
                                    o[A[1].toLowerCase()] = A[2]
                                }
                            }
                            A = o[z.toLowerCase()]
                        }
                        return A == null ? null : A
                    }, getAllResponseHeaders: function () {
                        return n === 2 ? t : null
                    }, setRequestHeader: function (B, z) {
                        var A = B.toLowerCase();
                        if (!n) {
                            B = u[A] = u[A] || B;
                            f[B] = z
                        }
                        return this
                    }, overrideMimeType: function (z) {
                        if (!n) {
                            k.mimeType = z
                        }
                        return this
                    }, statusCode: function (z) {
                        var A;
                        if (z) {
                            if (n < 2) {
                                for (A in z) {
                                    x[A] = [x[A], z[A]]
                                }
                            } else {
                                c.always(z[c.status])
                            }
                        }
                        return this
                    }, abort: function (z) {
                        var A = z || l;
                        if (a) {
                            a.abort(A)
                        }
                        h(0, A);
                        return this
                    }
                };
            s.promise(c).complete = v.add;
            c.success = c.done;
            c.error = c.fail;
            k.url = ((m || k.url || eE) + "").replace(cg, "").replace(dv, el[1] + "//");
            k.type = p.method || p.type || k.method || k.type;
            k.dataTypes = ee.trim(k.dataType || "*").toLowerCase().match(cF) || [""];
            if (k.crossDomain == null) {
                d = b7.exec(k.url.toLowerCase());
                k.crossDomain = !!(d && (d[1] !== el[1] || d[2] !== el[2] || (d[3] || (d[1] === "http:" ? "80" : "443")) !== (el[3] || (el[1] === "http:" ? "80" : "443"))))
            }
            if (k.data && k.processData && typeof k.data !== "string") {
                k.data = ee.param(k.data, k.traditional)
            }
            cj(em, k, p, c);
            if (n === 2) {
                return c
            }
            q = ee.event && k.global;
            if (q && ee.active++ === 0) {
                ee.event.trigger("ajaxStart")
            }
            k.type = k.type.toUpperCase();
            k.hasContent = !cf.test(k.type);
            y = k.url;
            if (!k.hasContent) {
                if (k.data) {
                    y = (k.url += (cd.test(y) ? "&" : "?") + k.data);
                    delete k.data
                }
                if (k.cache === false) {
                    k.url = cR.test(y) ? y.replace(cR, "$1_=" + dI++) : y + (cd.test(y) ? "&" : "?") + "_=" + dI++
                }
            }
            if (k.ifModified) {
                if (ee.lastModified[y]) {
                    c.setRequestHeader("If-Modified-Since", ee.lastModified[y])
                }
                if (ee.etag[y]) {
                    c.setRequestHeader("If-None-Match", ee.etag[y])
                }
            }
            if (k.data && k.hasContent && k.contentType !== false || p.contentType) {
                c.setRequestHeader("Content-Type", k.contentType)
            }
            c.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + (k.dataTypes[0] !== "*" ? ", " + a8 + "; q=0.01" : "") : k.accepts["*"]);
            for (b in k.headers) {
                c.setRequestHeader(b, k.headers[b])
            }
            if (k.beforeSend && (k.beforeSend.call(r, c, k) === false || n === 2)) {
                return c.abort()
            }
            l = "abort";
            for (b in {success: 1, error: 1, complete: 1}) {
                c[b](k[b])
            }
            a = cj(dE, k, p, c);
            if (!a) {
                h(-1, "No Transport")
            } else {
                c.readyState = 1;
                if (q) {
                    g.trigger("ajaxSend", [c, k])
                }
                if (k.async && k.timeout > 0) {
                    j = setTimeout(function () {
                        c.abort("timeout")
                    }, k.timeout)
                }
                try {
                    n = 1;
                    a.send(f, h)
                } catch (w) {
                    if (n < 2) {
                        h(-1, w)
                    } else {
                        throw w
                    }
                }
            }
            function h(E, D, C, G) {
                var I, z, B, F, A, H = D;
                if (n === 2) {
                    return
                }
                n = 2;
                if (j) {
                    clearTimeout(j)
                }
                a = undefined;
                t = G || "";
                c.readyState = E > 0 ? 4 : 0;
                I = E >= 200 && E < 300 || E === 304;
                if (C) {
                    F = cH(k, c, C)
                }
                F = dL(k, F, c, I);
                if (I) {
                    if (k.ifModified) {
                        A = c.getResponseHeader("Last-Modified");
                        if (A) {
                            ee.lastModified[y] = A
                        }
                        A = c.getResponseHeader("etag");
                        if (A) {
                            ee.etag[y] = A
                        }
                    }
                    if (E === 204 || k.type === "HEAD") {
                        H = "nocontent"
                    } else {
                        if (E === 304) {
                            H = "notmodified"
                        } else {
                            H = F.state;
                            z = F.data;
                            B = F.error;
                            I = !B
                        }
                    }
                } else {
                    B = H;
                    if (E || !H) {
                        H = "error";
                        if (E < 0) {
                            E = 0
                        }
                    }
                }
                c.status = E;
                c.statusText = (D || H) + "";
                if (I) {
                    s.resolveWith(r, [z, H, c])
                } else {
                    s.rejectWith(r, [c, H, B])
                }
                c.statusCode(x);
                x = undefined;
                if (q) {
                    g.trigger(I ? "ajaxSuccess" : "ajaxError", [c, k, I ? z : B])
                }
                v.fireWith(r, [c, H]);
                if (q) {
                    g.trigger("ajaxComplete", [c, k]);
                    if (!(--ee.active)) {
                        ee.event.trigger("ajaxStop")
                    }
                }
            }

            return c
        },
        getJSON: function (b, a, c) {
            return ee.get(b, a, c, "json")
        },
        getScript: function (b, a) {
            return ee.get(b, undefined, a, "script")
        }
    });
    ee.each(["get", "post"], function (a, b) {
        ee[b] = function (c, f, d, g) {
            if (ee.isFunction(f)) {
                g = g || d;
                d = f;
                f = undefined
            }
            return ee.ajax({url: c, type: b, dataType: g, data: f, success: d})
        }
    });
    ee._evalUrl = function (a) {
        return ee.ajax({url: a, type: "GET", dataType: "script", async: false, global: false, "throws": true})
    };
    ee.fn.extend({
        wrapAll: function (b) {
            if (ee.isFunction(b)) {
                return this.each(function (c) {
                    ee(this).wrapAll(b.call(this, c))
                })
            }
            if (this[0]) {
                var a = ee(b, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    a.insertBefore(this[0])
                }
                a.map(function () {
                    var c = this;
                    while (c.firstChild && c.firstChild.nodeType === 1) {
                        c = c.firstChild
                    }
                    return c
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            if (ee.isFunction(a)) {
                return this.each(function (b) {
                    ee(this).wrapInner(a.call(this, b))
                })
            }
            return this.each(function () {
                var b = ee(this), c = b.contents();
                if (c.length) {
                    c.wrapAll(a)
                } else {
                    b.append(a)
                }
            })
        }, wrap: function (b) {
            var a = ee.isFunction(b);
            return this.each(function (c) {
                ee(this).wrapAll(a ? b.call(this, c) : b)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                if (!ee.nodeName(this, "body")) {
                    ee(this).replaceWith(this.childNodes)
                }
            }).end()
        }
    });
    ee.expr.filters.hidden = function (a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || (!cN.reliableHiddenOffsets() && ((a.style && a.style.display) || ee.css(a, "display")) === "none")
    };
    ee.expr.filters.visible = function (a) {
        return !ee.expr.filters.hidden(a)
    };
    var ev = /%20/g, ek = /\[\]$/, cK = /\r?\n/g, c8 = /^(?:submit|button|image|reset|file)$/i,
        dF = /^(?:input|select|textarea|keygen)/i;

    function dZ(f, c, a, d) {
        var b;
        if (ee.isArray(c)) {
            ee.each(c, function (g, h) {
                if (a || ek.test(f)) {
                    d(f, h)
                } else {
                    dZ(f + "[" + (typeof h === "object" ? g : "") + "]", h, a, d)
                }
            })
        } else {
            if (!a && ee.type(c) === "object") {
                for (b in c) {
                    dZ(f + "[" + b + "]", c[b], a, d)
                }
            } else {
                d(f, c)
            }
        }
    }

    ee.param = function (c, f) {
        var d, a = [], b = function (h, g) {
            g = ee.isFunction(g) ? g() : (g == null ? "" : g);
            a[a.length] = encodeURIComponent(h) + "=" + encodeURIComponent(g)
        };
        if (f === undefined) {
            f = ee.ajaxSettings && ee.ajaxSettings.traditional
        }
        if (ee.isArray(c) || (c.jquery && !ee.isPlainObject(c))) {
            ee.each(c, function () {
                b(this.name, this.value)
            })
        } else {
            for (d in c) {
                dZ(d, c[d], f, b)
            }
        }
        return a.join("&").replace(ev, "+")
    };
    ee.fn.extend({
        serialize: function () {
            return ee.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var a = ee.prop(this, "elements");
                return a ? ee.makeArray(a) : this
            }).filter(function () {
                var a = this.type;
                return this.name && !ee(this).is(":disabled") && dF.test(this.nodeName) && !c8.test(a) && (this.checked || !dp.test(a))
            }).map(function (a, c) {
                var b = ee(this).val();
                return b == null ? null : ee.isArray(b) ? ee.map(b, function (d) {
                    return {name: c.name, value: d.replace(cK, "\r\n")}
                }) : {name: c.name, value: b.replace(cK, "\r\n")}
            }).get()
        }
    });
    ee.ajaxSettings.xhr = ch.ActiveXObject !== undefined ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && cG() || dg()
    } : cG;
    var c2 = 0, c6 = {}, dC = ee.ajaxSettings.xhr();
    if (ch.attachEvent) {
        ch.attachEvent("onunload", function () {
            for (var a in c6) {
                c6[a](undefined, true)
            }
        })
    }
    cN.cors = !!dC && ("withCredentials" in dC);
    dC = cN.ajax = !!dC;
    if (dC) {
        ee.ajaxTransport(function (b) {
            if (!b.crossDomain || cN.cors) {
                var a;
                return {
                    send: function (d, h) {
                        var g, f = b.xhr(), c = ++c2;
                        f.open(b.type, b.url, b.async, b.username, b.password);
                        if (b.xhrFields) {
                            for (g in b.xhrFields) {
                                f[g] = b.xhrFields[g]
                            }
                        }
                        if (b.mimeType && f.overrideMimeType) {
                            f.overrideMimeType(b.mimeType)
                        }
                        if (!b.crossDomain && !d["X-Requested-With"]) {
                            d["X-Requested-With"] = "XMLHttpRequest"
                        }
                        for (g in d) {
                            if (d[g] !== undefined) {
                                f.setRequestHeader(g, d[g] + "")
                            }
                        }
                        f.send((b.hasContent && b.data) || null);
                        a = function (k, l) {
                            var m, n, j;
                            if (a && (l || f.readyState === 4)) {
                                delete c6[c];
                                a = undefined;
                                f.onreadystatechange = ee.noop;
                                if (l) {
                                    if (f.readyState !== 4) {
                                        f.abort()
                                    }
                                } else {
                                    j = {};
                                    m = f.status;
                                    if (typeof f.responseText === "string") {
                                        j.text = f.responseText
                                    }
                                    try {
                                        n = f.statusText
                                    } catch (o) {
                                        n = ""
                                    }
                                    if (!m && b.isLocal && !b.crossDomain) {
                                        m = j.text ? 200 : 404
                                    } else {
                                        if (m === 1223) {
                                            m = 204
                                        }
                                    }
                                }
                            }
                            if (j) {
                                h(m, n, j, f.getAllResponseHeaders())
                            }
                        };
                        if (!b.async) {
                            a()
                        } else {
                            if (f.readyState === 4) {
                                setTimeout(a)
                            } else {
                                f.onreadystatechange = c6[c] = a
                            }
                        }
                    }, abort: function () {
                        if (a) {
                            a(undefined, true)
                        }
                    }
                }
            }
        })
    }
    function cG() {
        try {
            return new ch.XMLHttpRequest()
        } catch (a) {
        }
    }

    function dg() {
        try {
            return new ch.ActiveXObject("Microsoft.XMLHTTP")
        } catch (a) {
        }
    }

    ee.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (a) {
                ee.globalEval(a);
                return a
            }
        }
    });
    ee.ajaxPrefilter("script", function (a) {
        if (a.cache === undefined) {
            a.cache = false
        }
        if (a.crossDomain) {
            a.type = "GET";
            a.global = false
        }
    });
    ee.ajaxTransport("script", function (c) {
        if (c.crossDomain) {
            var b, a = cp.head || ee("head")[0] || cp.documentElement;
            return {
                send: function (f, d) {
                    b = cp.createElement("script");
                    b.async = true;
                    if (c.scriptCharset) {
                        b.charset = c.scriptCharset
                    }
                    b.src = c.url;
                    b.onload = b.onreadystatechange = function (g, h) {
                        if (h || !b.readyState || /loaded|complete/.test(b.readyState)) {
                            b.onload = b.onreadystatechange = null;
                            if (b.parentNode) {
                                b.parentNode.removeChild(b)
                            }
                            b = null;
                            if (!h) {
                                d(200, "success")
                            }
                        }
                    };
                    a.insertBefore(b, a.firstChild)
                }, abort: function () {
                    if (b) {
                        b.onload(undefined, true)
                    }
                }
            }
        }
    });
    var dJ = [], cx = /(=)\?(?=&|$)|\?\?/;
    ee.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var a = dJ.pop() || (ee.expando + "_" + (dI++));
            this[a] = true;
            return a
        }
    });
    ee.ajaxPrefilter("json jsonp", function (g, f, b) {
        var c, a, h,
            d = g.jsonp !== false && (cx.test(g.url) ? "url" : typeof g.data === "string" && !(g.contentType || "").indexOf("application/x-www-form-urlencoded") && cx.test(g.data) && "data");
        if (d || g.dataTypes[0] === "jsonp") {
            c = g.jsonpCallback = ee.isFunction(g.jsonpCallback) ? g.jsonpCallback() : g.jsonpCallback;
            if (d) {
                g[d] = g[d].replace(cx, "$1" + c)
            } else {
                if (g.jsonp !== false) {
                    g.url += (cd.test(g.url) ? "&" : "?") + g.jsonp + "=" + c
                }
            }
            g.converters["script json"] = function () {
                if (!h) {
                    ee.error(c + " was not called")
                }
                return h[0]
            };
            g.dataTypes[0] = "json";
            a = ch[c];
            ch[c] = function () {
                h = arguments
            };
            b.always(function () {
                ch[c] = a;
                if (g[c]) {
                    g.jsonpCallback = f.jsonpCallback;
                    dJ.push(c)
                }
                if (h && ee.isFunction(a)) {
                    a(h[0])
                }
                h = a = undefined
            });
            return "script"
        }
    });
    ee.parseHTML = function (c, f, d) {
        if (!c || typeof c !== "string") {
            return null
        }
        if (typeof f === "boolean") {
            d = f;
            f = false
        }
        f = f || cp;
        var a = b8.exec(c), b = !d && [];
        if (a) {
            return [f.createElement(a[1])]
        }
        a = ee.buildFragment([c], f, b);
        if (b && b.length) {
            ee(b).remove()
        }
        return ee.merge([], a.childNodes)
    };
    var eB = ee.fn.load;
    ee.fn.load = function (h, b, g) {
        if (typeof h !== "string" && eB) {
            return eB.apply(this, arguments)
        }
        var f, j, c, d = this, a = h.indexOf(" ");
        if (a >= 0) {
            f = ee.trim(h.slice(a, h.length));
            h = h.slice(0, a)
        }
        if (ee.isFunction(b)) {
            g = b;
            b = undefined
        } else {
            if (b && typeof b === "object") {
                c = "POST"
            }
        }
        if (d.length > 0) {
            ee.ajax({url: h, type: c, dataType: "html", data: b}).done(function (k) {
                j = arguments;
                d.html(f ? ee("<div>").append(ee.parseHTML(k)).find(f) : k)
            }).complete(g && function (l, k) {
                    d.each(g, j || [l.responseText, k, l])
                })
        }
        return this
    };
    ee.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
        ee.fn[b] = function (c) {
            return this.on(b, c)
        }
    });
    ee.expr.filters.animated = function (a) {
        return ee.grep(ee.timers, function (b) {
            return a === b.elem
        }).length
    };
    var d7 = ch.document.documentElement;

    function cD(a) {
        return ee.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
    }

    ee.offset = {
        setOffset: function (j, a, h) {
            var f, l, o, n, k, c, b, g = ee.css(j, "position"), m = ee(j), d = {};
            if (g === "static") {
                j.style.position = "relative"
            }
            k = m.offset();
            o = ee.css(j, "top");
            c = ee.css(j, "left");
            b = (g === "absolute" || g === "fixed") && ee.inArray("auto", [o, c]) > -1;
            if (b) {
                f = m.position();
                n = f.top;
                l = f.left
            } else {
                n = parseFloat(o) || 0;
                l = parseFloat(c) || 0
            }
            if (ee.isFunction(a)) {
                a = a.call(j, h, k)
            }
            if (a.top != null) {
                d.top = (a.top - k.top) + n
            }
            if (a.left != null) {
                d.left = (a.left - k.left) + l
            }
            if ("using" in a) {
                a.using.call(j, d)
            } else {
                m.css(d)
            }
        }
    };
    ee.fn.extend({
        offset: function (a) {
            if (arguments.length) {
                return a === undefined ? this : this.each(function (h) {
                    ee.offset.setOffset(this, a, h)
                })
            }
            var d, b, f = {top: 0, left: 0}, g = this[0], c = g && g.ownerDocument;
            if (!c) {
                return
            }
            d = c.documentElement;
            if (!ee.contains(d, g)) {
                return f
            }
            if (typeof g.getBoundingClientRect !== dW) {
                f = g.getBoundingClientRect()
            }
            b = cD(c);
            return {
                top: f.top + (b.pageYOffset || d.scrollTop) - (d.clientTop || 0),
                left: f.left + (b.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
            }
        }, position: function () {
            if (!this[0]) {
                return
            }
            var d, c, b = {top: 0, left: 0}, a = this[0];
            if (ee.css(a, "position") === "fixed") {
                c = a.getBoundingClientRect()
            } else {
                d = this.offsetParent();
                c = this.offset();
                if (!ee.nodeName(d[0], "html")) {
                    b = d.offset()
                }
                b.top += ee.css(d[0], "borderTopWidth", true);
                b.left += ee.css(d[0], "borderLeftWidth", true)
            }
            return {
                top: c.top - b.top - ee.css(a, "marginTop", true),
                left: c.left - b.left - ee.css(a, "marginLeft", true)
            }
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || d7;
                while (a && (!ee.nodeName(a, "html") && ee.css(a, "position") === "static")) {
                    a = a.offsetParent
                }
                return a || d7
            })
        }
    });
    ee.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (c, a) {
        var b = /Y/.test(a);
        ee.fn[c] = function (d) {
            return d3(this, function (j, f, g) {
                var h = cD(j);
                if (g === undefined) {
                    return h ? (a in h) ? h[a] : h.document.documentElement[f] : j[f]
                }
                if (h) {
                    h.scrollTo(!b ? g : ee(h).scrollLeft(), b ? g : ee(h).scrollTop())
                } else {
                    j[f] = g
                }
            }, c, d, arguments.length, null)
        }
    });
    ee.each(["top", "left"], function (a, b) {
        ee.cssHooks[b] = dz(cN.pixelPosition, function (d, c) {
            if (c) {
                c = ed(d, b);
                return cy.test(c) ? ee(d).position()[b] + "px" : c
            }
        })
    });
    ee.each({Height: "height", Width: "width"}, function (b, a) {
        ee.each({padding: "inner" + b, content: a, "": "outer" + b}, function (d, c) {
            ee.fn[c] = function (f, g) {
                var h = arguments.length && (d || typeof f !== "boolean"),
                    j = d || (f === true || g === true ? "margin" : "border");
                return d3(this, function (n, k, m) {
                    var l;
                    if (ee.isWindow(n)) {
                        return n.document.documentElement["client" + b]
                    }
                    if (n.nodeType === 9) {
                        l = n.documentElement;
                        return Math.max(n.body["scroll" + b], l["scroll" + b], n.body["offset" + b], l["offset" + b], l["client" + b])
                    }
                    return m === undefined ? ee.css(n, k, j) : ee.style(n, k, m, j)
                }, a, h ? f : undefined, h, null)
            }
        })
    });
    ee.fn.size = function () {
        return this.length
    };
    ee.fn.andSelf = ee.fn.addBack;
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
            return ee
        })
    }
    var du = ch.jQuery, cS = ch.$;
    ee.noConflict = function (a) {
        if (ch.$ === ee) {
            ch.$ = cS
        }
        if (a && ch.jQuery === ee) {
            ch.jQuery = du
        }
        return ee
    };
    if (typeof cQ === dW) {
        ch.jQuery = ch.$ = ee
    }
    return ee
}));
jQuery.cookie = function (w, p, i) {
    if (typeof p != "undefined") {
        i = i || {};
        if (p === null) {
            p = "";
            i.expires = -1
        }
        var t = "";
        if (i.expires && (typeof i.expires == "number" || i.expires.toUTCString)) {
            var s;
            if (typeof i.expires == "number") {
                s = new Date();
                s.setTime(s.getTime() + (i.expires * 24 * 60 * 60 * 1000))
            } else {
                s = i.expires
            }
            t = "; expires=" + s.toUTCString()
        }
        var n = i.path ? "; path=" + (i.path) : "";
        var r = i.domain ? "; domain=" + (i.domain) : "";
        var x = i.secure ? "; secure" : "";
        document.cookie = [w, "=", encodeURIComponent(p), t, n, r, x].join("")
    } else {
        var u = null;
        if (document.cookie && document.cookie != "") {
            var o = document.cookie.split(";");
            for (var q = 0; q < o.length; q++) {
                var v = jQuery.trim(o[q]);
                if (v.substring(0, w.length + 1) == (w + "=")) {
                    u = decodeURIComponent(v.substring(w.length + 1));
                    break
                }
            }
        }
        return u
    }
};
var isNarrowscreen = screen.width;
if (window.isBigWide) {
    $("body").attr("class", "w1200")
}
if (isNarrowscreen < 1228) {
    $("body").attr("class", "w980")
} else {
    if (isNarrowscreen > 1500) {
        if (window.isBigWide) {
            $("body").attr("class", "w1200 w1440")
        }
    }
}
function resize() {
    if (typeof(isFixedW980screen) != "undefined" && isFixedW980screen) {
        $("body").attr("class", "w980");
        return
    }
    var b = $(window).width();
    if (b < 1228) {
        $("body").attr("class", "w980")
    } else {
        if (b > 1500) {
            if (window.isBigWide) {
                $("body").attr("class", "w1200 w1440")
            }
        } else {
            if (window.isBigWide) {
                $("body").attr("class", "w1200")
            } else {
                $("body").attr("class", "")
            }
        }
    }
}
resize();
$(window).resize(function (b) {
    resize()
});
/*!
 * jQuery Migrate - v1.2.1 - 2013-05-08
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function (N, I, ad) {
    N.migrateMute = 1;
    var Q = {};
    N.migrateWarnings = [];
    if (!N.migrateMute && I.console && I.console.log) {
        I.console.log("JQMIGRATE: Logging is active")
    }
    if (N.migrateTrace === ad) {
        N.migrateTrace = true
    }
    N.migrateReset = function () {
        Q = {};
        N.migrateWarnings.length = 0
    };
    function af(a) {
        var b = I.console;
        if (!Q[a]) {
            Q[a] = true;
            N.migrateWarnings.push(a);
            if (b && b.warn && !N.migrateMute) {
                b.warn("JQMIGRATE: " + a);
                if (N.migrateTrace && b.trace) {
                    b.trace()
                }
            }
        }
    }

    function Y(d, b, e, c) {
        if (Object.defineProperty) {
            try {
                Object.defineProperty(d, b, {
                    configurable: true, enumerable: true, get: function () {
                        af(c);
                        return e
                    }, set: function (f) {
                        af(c);
                        e = f
                    }
                });
                return
            } catch (a) {
            }
        }
        N._definePropertyBroken = true;
        d[b] = e
    }

    if (document.compatMode === "BackCompat") {
        af("jQuery is not compatible with Quirks Mode")
    }
    var O = N("<input/>", {size: 1}).attr("size") && N.attrFn, ae = N.attr,
        ag = N.attrHooks.value && N.attrHooks.value.get || function () {
                return null
            }, ac = N.attrHooks.value && N.attrHooks.value.set || function () {
                return ad
            }, M = /^(?:input|button)$/i, ab = /^[238]$/,
        W = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        Z = /^(?:checked|selected)$/i;
    Y(N, "attrFn", O || {}, "jQuery.attrFn is deprecated");
    N.attr = function (d, f, c, e) {
        var a = f.toLowerCase(), b = d && d.nodeType;
        if (e) {
            if (ae.length < 4) {
                af("jQuery.fn.attr( props, pass ) is deprecated")
            }
            if (d && !ab.test(b) && (O ? f in O : N.isFunction(N.fn[f]))) {
                return N(d)[f](c)
            }
        }
        if (f === "type" && c !== ad && M.test(d.nodeName) && d.parentNode) {
            af("Can't change the 'type' of an input or button in IE 6/7/8")
        }
        if (!N.attrHooks[a] && W.test(a)) {
            N.attrHooks[a] = {
                get: function (i, j) {
                    var g, h = N.prop(i, j);
                    return h === true || typeof h !== "boolean" && (g = i.getAttributeNode(j)) && g.nodeValue !== false ? j.toLowerCase() : ad
                }, set: function (i, g, j) {
                    var h;
                    if (g === false) {
                        N.removeAttr(i, j)
                    } else {
                        h = N.propFix[j] || j;
                        if (h in i) {
                            i[h] = true
                        }
                        i.setAttribute(j, j.toLowerCase())
                    }
                    return j
                }
            };
            if (Z.test(a)) {
                af("jQuery.fn.attr('" + a + "') may use property instead of attribute")
            }
        }
        return ae.call(N, d, f, c)
    };
    N.attrHooks.value = {
        get: function (a, b) {
            var c = (a.nodeName || "").toLowerCase();
            if (c === "button") {
                return ag.apply(this, arguments)
            }
            if (c !== "input" && c !== "option") {
                af("jQuery.fn.attr('value') no longer gets properties")
            }
            return b in a ? a.value : null
        }, set: function (b, a) {
            var c = (b.nodeName || "").toLowerCase();
            if (c === "button") {
                return ac.apply(this, arguments)
            }
            if (c !== "input" && c !== "option") {
                af("jQuery.fn.attr('value', val) no longer sets properties")
            }
            b.value = a
        }
    };
    var G, al, aa = N.fn.init, H = N.parseJSON, ai = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    N.fn.init = function (d, a, b) {
        var c;
        if (d && typeof d === "string" && !N.isPlainObject(a) && (c = ai.exec(N.trim(d))) && c[0]) {
            if (d.charAt(0) !== "<") {
                af("$(html) HTML strings must start with '<' character")
            }
            if (c[3]) {
                af("$(html) HTML text after last tag is ignored")
            }
            if (c[0].charAt(0) === "#") {
                af("HTML string cannot start with a '#' character");
                N.error("JQMIGRATE: Invalid selector string (XSS)")
            }
            if (a && a.context) {
                a = a.context
            }
            if (N.parseHTML) {
                return aa.call(this, N.parseHTML(c[2], a, true), a, b)
            }
        }
        return aa.apply(this, arguments)
    };
    N.fn.init.prototype = N.fn;
    N.parseJSON = function (a) {
        if (!a && a !== null) {
            af("jQuery.parseJSON requires a valid JSON string");
            return null
        }
        return H.apply(this, arguments)
    };
    N.uaMatch = function (a) {
        a = a.toLowerCase();
        var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
        return {browser: b[1] || "", version: b[2] || "0"}
    };
    if (!N.browser) {
        G = N.uaMatch(navigator.userAgent);
        al = {};
        if (G.browser) {
            al[G.browser] = true;
            al.version = G.version
        }
        if (al.chrome) {
            al.webkit = true
        } else {
            if (al.webkit) {
                al.safari = true
            }
        }
        N.browser = al
    }
    Y(N, "browser", N.browser, "jQuery.browser is deprecated");
    N.sub = function () {
        function b(e, d) {
            return new b.fn.init(e, d)
        }

        N.extend(true, b, this);
        b.superclass = this;
        b.fn = b.prototype = this();
        b.fn.constructor = b;
        b.sub = this.sub;
        b.fn.init = function c(e, d) {
            if (d && d instanceof N && !(d instanceof b)) {
                d = b(d)
            }
            return N.fn.init.call(this, e, d, a)
        };
        b.fn.init.prototype = b.fn;
        var a = b(document);
        af("jQuery.sub() is deprecated");
        return b
    };
    N.ajaxSetup({converters: {"text json": N.parseJSON}});
    var K = N.fn.data;
    N.fn.data = function (b) {
        var c, d, a = this[0];
        if (a && b === "events" && arguments.length === 1) {
            c = N.data(a, b);
            d = N._data(a, b);
            if ((c === ad || c === d) && d !== ad) {
                af("Use of jQuery.fn.data('events') is deprecated");
                return d
            }
        }
        return K.apply(this, arguments)
    };
    var J = /\/(java|ecma)script/i, ak = N.fn.andSelf || N.fn.addBack;
    N.fn.andSelf = function () {
        af("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
        return ak.apply(this, arguments)
    };
    if (!N.clean) {
        N.clean = function (i, h, b, f) {
            h = h || document;
            h = !h.nodeType && h[0] || h;
            h = h.ownerDocument || h;
            af("jQuery.clean() is deprecated");
            var e, g, d, a, c = [];
            N.merge(c, N.buildFragment(i, h).childNodes);
            if (b) {
                d = function (j) {
                    if (!j.type || J.test(j.type)) {
                        return f ? f.push(j.parentNode ? j.parentNode.removeChild(j) : j) : b.appendChild(j)
                    }
                };
                for (e = 0; (g = c[e]) != null; e++) {
                    if (!(N.nodeName(g, "script") && d(g))) {
                        b.appendChild(g);
                        if (typeof g.getElementsByTagName !== "undefined") {
                            a = N.grep(N.merge([], g.getElementsByTagName("script")), d);
                            c.splice.apply(c, [e + 1, 0].concat(a));
                            e += a.length
                        }
                    }
                }
            }
            return c
        }
    }
    var U = N.event.add, V = N.event.remove, ah = N.event.trigger, T = N.fn.toggle, S = N.fn.live, L = N.fn.die,
        R = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess", P = new RegExp("\\b(?:" + R + ")\\b"),
        aj = /(?:^|\s)hover(\.\S+|)\b/, X = function (a) {
            if (typeof(a) !== "string" || N.event.special.hover) {
                return a
            }
            if (aj.test(a)) {
                af("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'")
            }
            return a && a.replace(aj, "mouseenter$1 mouseleave$1")
        };
    if (N.event.props && N.event.props[0] !== "attrChange") {
        N.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement")
    }
    if (N.event.dispatch) {
        Y(N.event, "handle", N.event.dispatch, "jQuery.event.handle is undocumented and deprecated")
    }
    N.event.add = function (c, e, d, b, a) {
        if (c !== document && P.test(e)) {
            af("AJAX events should be attached to document: " + e)
        }
        U.call(this, c, X(e || ""), d, b, a)
    };
    N.event.remove = function (b, d, c, a, e) {
        V.call(this, b, X(d) || "", c, a, e)
    };
    N.fn.error = function () {
        var a = Array.prototype.slice.call(arguments, 0);
        af("jQuery.fn.error() is deprecated");
        a.splice(0, 0, "error");
        if (arguments.length) {
            return this.bind.apply(this, a)
        }
        this.triggerHandler.apply(this, a);
        return this
    };
    N.fn.toggle = function (d, f) {
        if (!N.isFunction(d) || !N.isFunction(f)) {
            return T.apply(this, arguments)
        }
        af("jQuery.fn.toggle(handler, handler...) is deprecated");
        var a = arguments, b = d.guid || N.guid++, e = 0, c = function (h) {
            var g = (N._data(this, "lastToggle" + d.guid) || 0) % e;
            N._data(this, "lastToggle" + d.guid, g + 1);
            h.preventDefault();
            return a[g].apply(this, arguments) || false
        };
        c.guid = b;
        while (e < a.length) {
            a[e++].guid = b
        }
        return this.click(c)
    };
    N.fn.live = function (b, c, a) {
        af("jQuery.fn.live() is deprecated");
        if (S) {
            return S.apply(this, arguments)
        }
        N(this.context).on(b, this.selector, c, a);
        return this
    };
    N.fn.die = function (b, a) {
        af("jQuery.fn.die() is deprecated");
        if (L) {
            return L.apply(this, arguments)
        }
        N(this.context).off(b, this.selector || "**", a);
        return this
    };
    N.event.trigger = function (b, a, c, d) {
        if (!c && !P.test(b)) {
            af("Global events are undocumented and deprecated")
        }
        return ah.call(this, b, a, c || document, d)
    };
    N.each(R.split("|"), function (a, b) {
        N.event.special[b] = {
            setup: function () {
                var c = this;
                if (c !== document) {
                    N.event.add(document, b + "." + N.guid, function () {
                        N.event.trigger(b, null, c, true)
                    });
                    N._data(this, b, N.guid++)
                }
                return false
            }, teardown: function () {
                if (this !== document) {
                    N.event.remove(document, b + "." + N._data(this, b))
                }
                return false
            }
        }
    })
})(jQuery, window);
(function (c) {
    c.fn.bgIframe = c.fn.bgiframe = function (a) {
        if (c.browser.msie && parseInt(c.browser.version) <= 6) {
            a = c.extend({
                top: "auto",
                left: "auto",
                width: "auto",
                height: "auto",
                opacity: true,
                src: "javascript:false;"
            }, a || {});
            var f = function (e) {
                    return e && e.constructor == Number ? e + "px" : e
                },
                b = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + a.src + '"style="display:block;position:absolute;z-index:-1;' + (a.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (a.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : f(a.top)) + ";left:" + (a.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : f(a.left)) + ";width:" + (a.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : f(a.width)) + ";height:" + (a.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : f(a.height)) + ';"/>';
            return this.each(function () {
                if (c("> iframe.bgiframe", this).length == 0) {
                    this.insertBefore(document.createElement(b), this.firstChild)
                }
            })
        }
        return this
    };
    if (!c.browser.version) {
        if (navigator.userAgent && navigator.userAgent.toLowerCase() && navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)) {
            var d = navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/);
            if (d && d.length == 2) {
                c.browser.version = d[1]
            }
        }
    }
})(jQuery);
(function (c) {
    var d = window.loli || (window.loli = {});
    d.scroll = function (b, j) {
        var a = "";
        var k = j || 200;
        var l = k - 20;
        c(window).scroll(function () {
            setTimeout(function () {
                i()
            }, k);
            a = new Date().getTime()
        });
        function i() {
            if ((new Date().getTime() - a) >= l) {
                b();
                a = new Date().getTime()
            }
        }
    }
})(jQuery);
(function () {
    var u = window.loli || (window.loli = {});
    var r = u.cookie = u.cookie || {};
    var s = (typeof globalSyncCookieFlag != "undefined" && globalSyncCookieFlag == "1") ? 1 : 0;
    var o = typeof globalSyncCookieKey != "undefined" ? globalSyncCookieKey : "";
    var v = "yhd.com";
    var n = "yihaodian.com.hk";
    if (u.cookie && u.cookie.set) {
        return
    }
    var l = function () {
        var c = document.domain;
        var a = /([\.\w]*)\.yhd\.com/;
        var b = /([\.\w]*)\.yihaodian\.com\.hk/;
        if (a.test(c)) {
            return v
        } else {
            if (b.test(c)) {
                return n
            }
        }
        return c
    };
    var q = function () {
        var c = document.domain;
        var a = /([\.\w]*)\.yhd\.com/;
        var b = /([\.\w]*)\.yihaodian\.com\.hk/;
        if (a.test(c)) {
            return n
        } else {
            if (b.test(c)) {
                return v
            }
        }
        return c
    };
    var m = function () {
        var c = document.domain;
        var a = /([\.\w]*)\.yhd\.com/;
        var b = /([\.\w]*)\.yihaodian\.com\.hk/;
        return a.test(c) || b.test(c)
    };
    var t = function () {
        var a = window.navigator.userAgent.toLowerCase();
        var c = /msie ([\d\.]+)/;
        if (c.test(a)) {
            var b = parseInt(c.exec(a)[1]);
            return b
        }
        return 0
    };
    var p = function () {
        var a = new Date();
        return (a.getYear() + 1900) + "" + (a.getMonth() + 1) + "" + a.getDate()
    };
    r.set = function (a, f, e, b, h) {
        var c = h || function () {
            };
        var g = l();
        var d = isNaN(b) ? null : parseInt(b);
        if (typeof d == "number") {
            $.cookie(a, f, {domain: g, path: e || "/", expires: d})
        } else {
            $.cookie(a, f, {domain: g, path: e || "/"})
        }
        c({status: 1, name: a, value: f})
    };
    r.get = function (b, a) {
        var c = a || function () {
            };
        var d = $.cookie(b);
        c({status: 1, name: b, value: d});
        return d
    };
    r.getAll = function (e) {
        var c = e || function () {
            };
        var g = document.cookie;
        var f = g.split("; ");
        var d = {};
        for (var a = 0; a < f.length; a++) {
            var b = f[a].split("=");
            d[b[0]] = decodeURIComponent(b[1])
        }
        c({status: 1, data: d});
        return d
    };
    r.sendJsonpAjax = function (b, i, f, d) {
        var c = b + "?callback=" + f;
        var h = [];
        for (var a in i) {
            h.push("&" + a + "=" + encodeURIComponent(i[a]))
        }
        c += h.join("");
        window[f] = function (j) {
            d(j);
            if (e) {
                e.removeChild(g)
            }
        };
        var e = document.getElementsByTagName("head")[0] || document.documentElement;
        var g = document.createElement("script");
        g.src = c;
        e.insertBefore(g, e.firstChild)
    };
    r.setFromDomain = function (a, h, i, d, g, b) {
        var H = g || function () {
            };
        var L = m();
        var F = l();
        var f = b || F;
        if (f == "yhd" || f == v) {
            f = v
        } else {
            if (f == "hk" || f == n) {
                f = n
            } else {
                f = F
            }
        }
        if (f == F) {
            r.set(a, h, i, d, g)
        } else {
            if (!s || !L) {
                H({status: 1, name: a, value: h});
                return
            }
            if (!window.postMessage || !window.addEventListener) {
                var j = function (w) {
                    if (w && w.status == "1") {
                        H({status: 1, name: a, value: h})
                    }
                };
                h = (h == null || typeof h == "undefined") ? "" : h;
                d = (d == null || typeof d == "undefined") ? "" : d;
                var k = {type: "single", key: a + "|" + h + "|" + d};
                var G = "jsonp" + new Date().getTime() + "_" + Math.round(Math.random() * 100000);
                var I = window.location.protocol + "//www." + F + (F == v ? "/header" : "/hkHeader") + "/syncCookie.do";
                r.sendJsonpAjax(I, k, G, j);
                return
            }
            var E = "globalCookieAdaptorForSet";
            var c = $("#" + E);
            if (c.size() == 0) {
                var I = window.location.protocol + "//www." + f + "/hkHeader/setCookie.html?v=" + p();
                var e = document.createElement("iframe");
                e.setAttribute("id", E);
                e.setAttribute("style", "display:none");
                e.setAttribute("src", I);
                document.body.appendChild(e);
                c = $("#" + E)
            }
            var K = function (y) {
                var x = window.location.protocol + "//www." + f;
                var w = {name: a, value: h, path: i, expires: d, domain: f, op: "cookie"};
                if (t() == 9) {
                    h = (h == null || typeof h == "undefined") ? "" : h;
                    d = (d == null || typeof d == "undefined") ? "" : d;
                    i = (i == null || typeof i == "undefined") ? "" : i;
                    w = '{"name":"' + a + '", "value":"' + h + '", "path":"' + i + '", "expires":"' + d + '", "domain":"' + f + '", "op":"cookie"}'
                }
                y.postMessage(w, x);
                H({status: 1, name: a, value: h})
            };
            if (c.attr("loaded")) {
                var J = c.get(0).contentWindow;
                K(J)
            } else {
                c.load(function () {
                    $(this).attr("loaded", "1");
                    var w = $(this).get(0).contentWindow;
                    K(w)
                })
            }
        }
    };
    r.getFromDomain = function (c, b, e) {
        var d = b || function () {
            };
        var J = m();
        var D = l();
        var f = e || D;
        if (f == "yhd" || f == v) {
            f = v
        } else {
            if (f == "hk" || f == n) {
                f = n
            } else {
                f = D
            }
        }
        if (f == D) {
            r.get(c, b)
        } else {
            if (!s || !J) {
                d({status: 1, name: c, value: null});
                return
            }
            if (!window.postMessage || !window.addEventListener) {
                var h = function (x) {
                    if (x && x.status == "1") {
                        var w = x.result ? x.result[c] : null;
                        d({status: 1, name: c, value: w})
                    }
                };
                var E = "jsonp" + new Date().getTime() + "_" + Math.round(Math.random() * 100000);
                var g = window.location.protocol + "//www." + f + (f == v ? "/header" : "/hkHeader") + "/getCookie.do";
                r.sendJsonpAjax(g, {}, E, h);
                return
            }
            var i = window.yhd_cookie_get_callback || (window.yhd_cookie_get_callback = []);
            i.push(d);
            var G = i.length - 1;
            var k = "globalCookieAdaptorForGet";
            var a = $("#" + k);
            if (a.size() == 0) {
                var g = window.location.protocol + "//www." + f + "/hkHeader/getCookie.html?v=" + p();
                var j = document.createElement("iframe");
                j.setAttribute("id", k);
                j.setAttribute("style", "display:none");
                j.setAttribute("src", g);
                document.body.appendChild(j);
                a = $("#" + k)
            }
            var H = function (w) {
                var z = window.location.protocol + "//www." + f;
                var y = window.location.protocol + "//" + window.location.host;
                var x = {name: c, host: y, version: G, op: "cookie"};
                if (t() == 9) {
                    x = '{"name":"' + c + '", "host":"' + y + '", "version":"' + G + '", "op":"cookie"}'
                }
                w.postMessage(x, z)
            };
            if (a.attr("loaded")) {
                var F = a.get(0).contentWindow;
                H(F)
            } else {
                a.load(function () {
                    $(this).attr("loaded", "1");
                    var w = $(this).get(0).contentWindow;
                    H(w)
                })
            }
            var I = function (x) {
                var y = /^http[s]?:\/\/([\.\w]*)\.yhd\.com/i;
                var z = /^http[s]?:\/\/([\.\w]*)\.yihaodian\.com\.hk/i;
                if (y.test(x.origin) || z.test(x.origin)) {
                    var w = x.data;
                    if (w) {
                        if (typeof w == "string") {
                            w = $.parseJSON(w)
                        }
                        if (w.op != "cookie") {
                            return
                        }
                        var A = i[w.version];
                        if (A) {
                            A({status: 1, name: w.name, value: w.value})
                        } else {
                            d({status: 1, name: w.name, value: w.value})
                        }
                    }
                }
            };
            if (!window.yhd_cookie_get_handler) {
                window.addEventListener("message", I);
                window.yhd_cookie_get_handler = I
            }
        }
    };
    r.setAllDomain = function (a, d, c, b, f) {
        r.set(a, d, c, b);
        if (m()) {
            var e = q();
            r.setFromDomain(a, d, c, b, f, e)
        }
    };
    r.processServerCookie = function (e) {
        var c = m();
        var i = typeof globalServerCookieKey != "undefined" ? globalServerCookieKey : "";
        var a = $.cookie("globalServerCookieKey") || "";
        var b = "";
        if (!s || !c) {
            return
        }
        if (e) {
            b = e
        } else {
            if (i == a) {
                b = i
            } else {
                if (i != "" && a != "") {
                    b = i + "," + a
                } else {
                    if (i == "" && a != "") {
                        b = a
                    } else {
                        if (i != "" && a == "") {
                            b = i
                        }
                    }
                }
            }
        }
        if (!b) {
            return
        }
        var g = b.split(",");
        for (var h = 0; h < g.length; h++) {
            var d = g[h];
            var f = d.split("|");
            if (f.length == 4) {
                r.setFromDomain(f[0], decodeURIComponent(f[1]), "/", f[2], null, f[3])
            }
        }
    };
    r.processSyncCookie = function (x) {
        var f = x || o;
        var j = l();
        var h = q();
        var g = m();
        if (!s || !g) {
            return
        }
        if (!f) {
            return
        }
        if (j == v) {
            var d = f.split(",");
            for (var e = 0; e < d.length; e++) {
                var a = d[e].split("|");
                var k = a[0];
                var i = a[1];
                var c = $.cookie(k);
                if (i == "" || i == "-1" || isNaN(i)) {
                    r.setFromDomain(k, c, "/", null, null, h)
                } else {
                    r.setFromDomain(k, c, "/", i, null, h)
                }
            }
        } else {
            if (j == n) {
                var b = function (F) {
                    if (F.status == 1) {
                        var J = "";
                        var E = f.split(",");
                        for (var H = 0; H < E.length; H++) {
                            var I = E[H].split("|");
                            var G = I[0];
                            var w = I[1];
                            if (F.name == G) {
                                J = w;
                                break
                            }
                        }
                        if (J == "" || J == "-1" || isNaN(J)) {
                            r.set(F.name, F.value, "/")
                        } else {
                            r.set(F.name, F.value, "/", J)
                        }
                    }
                };
                var d = f.split(",");
                for (var e = 0; e < d.length; e++) {
                    var a = d[e].split("|");
                    var k = a[0];
                    r.getFromDomain(k, b, h)
                }
            }
        }
    };
    r.sync = function (G, H) {
        var F = G || "";
        var I = H || function () {
            };
        var k = l();
        var E = q();
        var J = m();
        if (!s || !J) {
            return
        }
        if (!F) {
            return
        }
        var g = [];
        var d = [];
        if (typeof F == "string") {
            g = F.split(",")
        } else {
            g = F
        }
        var b = function (w) {
            if (w.status == 1) {
                d.push(w.name)
            }
            if (d.length == g.length) {
                I({status: 1})
            }
        };
        for (var j = 0; j < g.length; j++) {
            var f = g[j].split("|");
            var c = f[0];
            var e = f[1];
            var i = $.cookie(c);
            if (e == null) {
                var a = o.split(",");
                for (var D = 0; D < a.length; D++) {
                    var h = a[D].split("|");
                    if (c == h[0]) {
                        e = h[1];
                        break
                    }
                }
            }
            if (e == "" || e == "-1" || isNaN(e)) {
                r.setFromDomain(c, i, "/", null, b, E)
            } else {
                r.setFromDomain(c, i, "/", e, b, E)
            }
        }
    };
    r.getAllFromDomain = function (a, g) {
        var d = a || function () {
            };
        var h = m();
        var b = l();
        var f = g || b;
        if (f == "yhd" || f == v) {
            f = v
        } else {
            if (f == "hk" || f == n) {
                f = n
            } else {
                f = b
            }
        }
        if (f == b) {
            r.getAll(a)
        } else {
            if (!s || !h) {
                d({status: 1, data: null});
                return
            }
            var i = function (k) {
                if (k && k.status == "1") {
                    var j = k.result;
                    d({status: 1, data: j})
                }
            };
            var e = "jsonp" + new Date().getTime() + "_" + Math.round(Math.random() * 100000);
            var c = window.location.protocol + "//www." + f + (f == v ? "/header" : "/hkHeader") + "/getCookie.do";
            r.sendJsonpAjax(c, {}, e, i);
            return
        }
    };
    r.setYhdLocation = function (f, g) {
        var c = g || function () {
            };
        var e = 2;
        var d = 2817;
        var a = "2_2817_51973_0";
        if (typeof(f) != "undefined" && f) {
            var b = f.split("_");
            e = b[0];
            d = b[1];
            a = f
        }
        $.cookie("provinceId", e, {domain: "yhd.com", path: "/", expires: 800});
        $.cookie("cityId", d, {domain: "yhd.com", path: "/", expires: 800});
        $.cookie("yhd_location", a, {domain: "yhd.com", path: "/", expires: 800});
        c({status: 1})
    };
    $(function () {
        var a = m();
        if (!s || !a) {
            return
        }
        r.processServerCookie()
    })
})();
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
;!function (a) {
    "function" == typeof define && define.amd ? define("mousewheel", ["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function (k) {
    function a(o) {
        var p = o || window.event, r = h.call(arguments, 1), l = 0, t = 0, u = 0, v = 0, x = 0, m = 0;
        if (o = k.event.fix(p), o.type = "mousewheel", "detail" in p && (u = -1 * p.detail), "wheelDelta" in p && (u = p.wheelDelta), "wheelDeltaY" in p && (u = p.wheelDeltaY), "wheelDeltaX" in p && (t = -1 * p.wheelDeltaX), "axis" in p && p.axis === p.HORIZONTAL_AXIS && (t = -1 * u, u = 0), l = 0 === u ? t : u, "deltaY" in p && (u = -1 * p.deltaY, l = u), "deltaX" in p && (t = p.deltaX, 0 === u && (l = -1 * t)), 0 !== u || 0 !== t) {
            if (1 === p.deltaMode) {
                var n = k.data(this, "mousewheel-line-height");
                l *= n, u *= n, t *= n
            } else {
                if (2 === p.deltaMode) {
                    var q = k.data(this, "mousewheel-page-height");
                    l *= q, u *= q, t *= q
                }
            }
            if (v = Math.max(Math.abs(u), Math.abs(t)), (!e || e > v) && (e = v, c(p, v) && (e /= 40)), c(p, v) && (l /= 40, t /= 40, u /= 40), l = Math[l >= 1 ? "floor" : "ceil"](l / e), t = Math[t >= 1 ? "floor" : "ceil"](t / e), u = Math[u >= 1 ? "floor" : "ceil"](u / e), j.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                x = o.clientX - s.left, m = o.clientY - s.top
            }
            return o.deltaX = t, o.deltaY = u, o.deltaFactor = e, o.offsetX = x, o.offsetY = m, o.deltaMode = 0, r.unshift(o, l, t, u), d && clearTimeout(d), d = setTimeout(b, 200), (k.event.dispatch || k.event.handle).apply(this, r)
        }
    }

    function b() {
        e = null
    }

    function c(l, m) {
        return j.settings.adjustOldDeltas && "mousewheel" === l.type && m % 120 === 0
    }

    var d, e, f = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        g = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        h = Array.prototype.slice;
    if (k.event.fixHooks) {
        for (var i = f.length; i;) {
            k.event.fixHooks[f[--i]] = k.event.mouseHooks
        }
    }
    var j = k.event.special.mousewheel = {
        version: "3.1.12", setup: function () {
            if (this.addEventListener) {
                for (var l = g.length; l;) {
                    this.addEventListener(g[--l], a, !1)
                }
            } else {
                this.onmousewheel = a
            }
            k.data(this, "mousewheel-line-height", j.getLineHeight(this)), k.data(this, "mousewheel-page-height", j.getPageHeight(this))
        }, teardown: function () {
            if (this.removeEventListener) {
                for (var l = g.length; l;) {
                    this.removeEventListener(g[--l], a, !1)
                }
            } else {
                this.onmousewheel = null
            }
            k.removeData(this, "mousewheel-line-height"), k.removeData(this, "mousewheel-page-height")
        }, getLineHeight: function (l) {
            var m = k(l), n = m["offsetParent" in k.fn ? "offsetParent" : "parent"]();
            return n.length || (n = k("body")), parseInt(n.css("fontSize"), 10) || parseInt(m.css("fontSize"), 10) || 16
        }, getPageHeight: function (l) {
            return k(l).height()
        }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
    };
    k.fn.extend({
        mousewheel: function (l) {
            return l ? this.bind("mousewheel", l) : this.trigger("mousewheel")
        }, unmousewheel: function (l) {
            return this.unbind("mousewheel", l)
        }
    })
});
loli = window.loli || (window.loli = {});
(function (c) {
    var d = window.loli || (window.loli = {});
    d.delay = function (b, n, p, t, m) {
        var r = "";
        var a = m || 200;
        var s = a - 50;
        var o;
        c(b)[n](function () {
            var f = c(this);
            var e = true;
            if (p) {
                var e = p.call(f)
            }
            if (!(e == false)) {
                o = setTimeout(function () {
                    q.call(f)
                }, a);
                r = new Date().getTime()
            }
        });
        function q() {
            if ((new Date().getTime() - r) >= s) {
                if (t) {
                    t.call(this)
                }
                r = new Date().getTime()
            }
        }
    }
})(jQuery);
(function () {
    var e = window.loli || (window.loli = {});
    var f = e;
    var g = f.util = f.util || {};
    g.hashImgUrl = function (c) {
        var b = "[https:]*//d(\\d{1,2})\\.";
        var a = new RegExp(b, "i");
        if (a.test(c)) {
            var d = g.toHash(c);
            return c.replace(a, "//d" + (d % 4 + 6) + ".")
        } else {
            return c
        }
    };
    g.toHash = function (a) {
        var b = 0;
        for (var c = 0; c < a.length; c++) {
            if (a[c]) {
                b += a[c].charCodeAt()
            }
        }
        return b
    };
    g.isIE = function () {
        var a = window.navigator.userAgent.toLowerCase();
        var c = /msie ([\d\.]+)/;
        if (c.test(a)) {
            var b = parseInt(c.exec(a)[1]);
            return b
        }
        return 0
    };
    g.isIpad = function () {
        var a = window.navigator.userAgent;
        return a.indexOf("iPad") > 1
    };
    g.isSafari = function () {
        var b = window.navigator.userAgent.toLowerCase();
        var a = /safari/i;
        var c = /chrome/i;
        var d = /Android/i;
        if (a.test(b) && !c.test(b) && !d.test(b)) {
            return true
        }
        return false
    };
    g.isStorageSupported = function () {
        var b = g.isIE();
        if ((b != 0 && b < 9) || g.isSafari()) {
            return false
        }
        try {
            if (window.localStorage) {
                localStorage.setItem("__testLocal", "1");
                var c = localStorage.getItem("__testLocal");
                return c
            }
            return false
        } catch (a) {
            return false
        }
    };
    g.generateMixed = function (b) {
        var i = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var c = "";
        for (var d = 0; d < b; d++) {
            var a = Math.floor(Math.random() * 32);
            c += i[a]
        }
        return c
    };
    g.isExistArray = function (d, a) {
        var c = false;
        for (var b = 0; b < d.length; b++) {
            if (d[b] == a) {
                c = true;
                break
            }
        }
        return c
    };
    g.removeUrlHttp = function (b) {
        var a = /^[https:]*\/\/([\.\w]*)\.(yihaodian||yhd)[img]*\.com/;
        if (b && a.test(b)) {
            b = b.substring(b.indexOf("/"))
        }
        return b
    };
    g.resizeItemPic = function (l, a, b) {
        var c = a || 0;
        var d = b || 0;
        var k = /_\d+x\d+\.([a-zA-Z]+)$/;
        if (l && a && b) {
            if (k.test(l)) {
                l = l.replace(k, "_" + c + "x" + d + ".$1")
            } else {
                l = l.substring(0, l.lastIndexOf(".")) + "_" + c + "x" + d + l.substring(l.lastIndexOf("."))
            }
        }
        if (!l) {
            l = "//img.yihaodianimg.com/front-homepage/global/images/defaultproduct.jpg"
        }
        return l
    };
    g.resizePicJD = function (n, o, a) {
        if (n && o && a) {
            var p = ".360buyimg.com/test/s";
            var c = o + "x" + a + "_";
            var m = [10, 11, 12, 13, 14, 20, 30];
            var d = Math.ceil(Math.random() * 7);
            var b = "//img" + m[d - 1] + p + c;
            return b + n
        } else {
            return n
        }
    };
    function h(a) {
        if (!a) {
            return true
        }
        for (var b in a) {
            return false
        }
        return true
    }

    g.url = {
        getParams: function (a) {
            a = $.trim(a);
            var c = this;
            var b = c.parseUrl(a);
            return b ? b.params : null
        }, appendParams: function (a, d) {
            var k = this;
            if (h(d)) {
                return a
            }
            var b = k.parseUrl(a);
            if (!b) {
                return a
            }
            var c = b.params;
            for (var l in d) {
                if (d.hasOwnProperty(l) && (d[l] != null && typeof d[l] !== "undefined" && $.trim(d[l]).length > 0)) {
                    c[l] = d[l]
                } else {
                    if (d.hasOwnProperty(l) && (d[l] == null || typeof d[l] === "undefined" || $.trim(d[l]) == "")) {
                        delete c[l]
                    }
                }
            }
            b.params = c;
            return k.toCusString(b)
        }, deleteParams: function (c, m) {
            var a = this;
            if (!m || m.length < 0) {
                return c
            }
            var i = a.parseUrl(c);
            if (!i) {
                return c
            }
            var d = i.params;
            for (var n = 0; n < m.length; n++) {
                var b = m[n];
                if (d.hasOwnProperty(b)) {
                    delete d[b]
                }
            }
            i.params = d;
            return a.toCusString(i)
        }, parseUrl: function (C) {
            var F = "";
            var x = "";
            var E = "";
            var d = {};
            C = $.trim(C);
            if (C == "") {
                return null
            }
            var b = C.split("#");
            var D = b[0];
            if (b.length >= 2) {
                for (var i = 1, a = b.length; i < a; i++) {
                    F += "#" + b[i]
                }
            }
            var u = D.indexOf("?");
            var z = D.length;
            if (u > 0) {
                x = D.substring(0, u);
                E = D.substring(u + 1, z)
            } else {
                x = D
            }
            if (E) {
                var A = E.split("&");
                for (var i = 0, a = A.length; i < a; i++) {
                    var y = A[i].indexOf("=");
                    if (y == -1) {
                        continue
                    }
                    var w = A[i].substring(0, y);
                    var c = A[i].substring(y + 1);
                    d[w] = c
                }
            }
            var B = {loc: x, params: d, append: F};
            return B
        }, toCusString: function (c) {
            var a = [];
            a.push(c.loc);
            var b = c.params;
            if (!h(b)) {
                a.push("?");
                var j = 0;
                for (var d in b) {
                    if (b.hasOwnProperty(d) && (b[d] != null && typeof b[d] !== "undefined" && $.trim(b[d]).length > 0)) {
                        if (j) {
                            a.push("&")
                        }
                        a.push(d + "=" + b[d]);
                        j++
                    }
                }
            }
            if (c.append) {
                a.push(c.append)
            }
            return a.join("")
        }
    };
    g.getYhdImgUrlBySize = function (c, a, o) {
        if (!c || !a || !o) {
            return c
        }
        var n = /\/s\d{1,}x\d{1,}_/;
        if (n.test(url)) {
            return c
        }
        try {
            var b = c.split(".");
            var d = b[2].split("/");
            var m = d[2];
            d[2] = ["s", a, "x", o, "_" + m].join("");
            b[2] = d.join("/");
            return b.join(".")
        } catch (p) {
            return c
        }
    };
    g.getYhdImgUrlByPath = function (m, d, n, l, a) {
        if (!l || !d || !n) {
            return ""
        }
        if (a == 1) {
            return "//m.360buyimg.com/n1/s" + d + "x" + n + "_" + l
        }
        try {
            var c;
            m = m ? m : 0;
            switch (m % 5) {
                case 0:
                    c = 10;
                    break;
                case 1:
                    c = 11;
                    break;
                case 2:
                    c = 12;
                    break;
                case 3:
                    c = 13;
                    break;
                case 4:
                    c = 14;
                    break;
                default:
                    c = 10
            }
            return "//img" + c + ".360buyimg.com/n1/s" + d + "x" + n + "_" + l
        } catch (b) {
            return ""
        }
    }
})();
(function (c) {
    var d = window.loli || (window.loli = {});
    d.globalCheckLogin = function (a) {
        function h(e) {
            if (!jQuery.cookie("yihaodian_uid")) {
                e({result: "0", userName: ""});
                return
            }
            g(e)
        }

        function g(e) {
            var f = ((typeof URLPrefix.passport != "undefined") ? URLPrefix.passport : "https://passport.yhd.com") + "/publicPassport/isLogin.do?callback=?";
            jQuery.ajax({
                type: "get", url: f, dataType: "json", success: function (j) {
                    b(e, j)
                }, error: function () {
                    e({result: "0", userName: ""})
                }
            })
        }

        function b(e, f) {
            if (f) {
                if (e) {
                    e(f);
                    return
                }
            }
            e({result: "0", userName: ""})
        }

        h(a)
    }
})(jQuery);
(function (c) {
    var d = function (f) {
        var a = f, b = {
            activeLoadTime: 2000,
            load: true,
            activeLoadNum: 1,
            hfix: 100,
            callback: null,
            attr: "lazyLoad_textarea",
            flushPrice: true,
            flushPriceAttr: "productid",
            indexLoad: false,
            scrollLoad: true
        };
        c.extend(b, a);
        this.param = b
    };
    d.prototype = {
        constructor: d, doc: document, areaArray: [], lazyDom: function (i, j) {
            var b = this, a = b.param, h = i;
            if (j) {
                b.param = c.extend(a, j)
            }
            b.areaArray = b._getJqueryDomArray(h, a);
            if (a.indexLoad) {
                b._domScrollLoad(b.areaArray, a)
            }
            if (a.scrollLoad) {
                b._loadScrollDom(function () {
                    if (b.areaArray.length == 0) {
                        return
                    }
                    b._domScrollLoad(b.areaArray, a)
                })
            }
            if (a.load) {
                b._loadActiveDom(b.areaArray, a)
            }
        }, _loadActiveDom: function (k, m) {
            var j = this, b = m, n = b.activeLoadTime, a = k;
            var l = setInterval(function () {
                var e = a.length;
                if (e == 0) {
                    clearInterval(l);
                    return
                }
                j._domActiveLoad(a, b)
            }, n)
        }, _loadScrollDom: function (a) {
            loli.scroll(function () {
                a()
            }, 50)
        }, _domScrollLoad: function (m, a) {
            var i = this, a = i.param, b = [];
            for (var n = 0, k = m.length; n < k; n++) {
                var l = i._getJqueryDom(m[n]);
                if (i.isInCurrScreen(l)) {
                    i._rendDom(l, a)
                } else {
                    b.push(l)
                }
            }
            i.areaArray = b
        }, _domActiveLoad: function (l, b) {
            var o = this, m = b, i = l, n = i.length, p = Math.min(m.activeLoadNum, n);
            for (var a = 0; a < p; a++) {
                o._rendDom(o._getJqueryDom(i.shift()), m)
            }
        }, _rendDom: function (a, q) {
            var l = a, o = q, p = o.attr, m = l.attr(p), b = c("#" + m), n = o.flushPrice, r = o.flushPriceAttr;
            if (b.size() > 0) {
                l.html(b.val())
            }
            l.removeAttr(p);
            if (n) {
                l.lazyPrice({attr: r, oneOffLoad: true})
            }
            if (o.callback) {
                o.callback.call(l)
            }
        }, isInCurrScreen: function (o) {
            var m = this, l = o, r = m.doc, b = r.documentElement, n = m.param, q = n.hfix,
                p = Math.max(b.scrollTop, r.body.scrollTop), a = b.clientHeight + p;
            if (l) {
                return (l.offset().top < a + q) && (l.offset().top > p - q)
            }
            return false
        }, _getJqueryDomArray: function (a, b) {
            var h = [], g = b.attr;
            if (a instanceof c) {
                h = a.find("[" + g + "]").get()
            } else {
                if (c.isArray(a)) {
                    h = a;
                    return h
                } else {
                    a = c(a);
                    h = a.find("[" + g + "]").get()
                }
            }
            if (h.length == 0) {
                if (a.attr(g)) {
                    h.push(a)
                }
            }
            return h
        }, _getJqueryDom: function (a) {
            if (!a) {
                return a
            }
            if (a instanceof c) {
                return a
            }
            return c(a)
        }
    };
    c.fn.extend({
        lazyDom: function (a) {
            var b = new d();
            return b.lazyDom(this, a)
        }
    })
})(jQuery);
(function (d) {
    var e = function (c) {
        var a = c, b = {
            lazyImg: {
                ltime: "2000",
                lnum: "5",
                load: true,
                indexLoad: false,
                scrollLoad: true,
                attr: "original",
                wideAttr: null,
                hfix: 100
            }
        };
        d.extend(b, a);
        this.param = b
    };
    e.prototype = {
        constructor: e, isBusy: false, doc: document, imgArray: [], lazyImg: function (b, j) {
            var c = this, a = c.param.lazyImg, k, l = b;
            if (j) {
                c.param.lazyImg = d.extend(a, j)
            }
            if (l instanceof d) {
                k = l
            } else {
                if (d.isArray(l)) {
                    l = d(l.join(","))
                } else {
                    l = d(l) || d("body")
                }
            }
            if (a.wideAttr) {
                if ("original" == a.attr) {
                    c.imgArray = l.find("img[" + a.attr + "],img[" + a.wideAttr + "]")
                } else {
                    c.imgArray = l.find("img[" + a.attr + "],img[" + a.wideAttr + "],img[original]")
                }
            } else {
                if ("original" == a.attr) {
                    c.imgArray = l.find("img[" + a.attr + "]")
                } else {
                    c.imgArray = l.find("img[" + a.attr + "],img[original]")
                }
            }
            if (a.indexLoad) {
                c._lazyImg(c.imgArray, a)
            }
            if (a.scrollLoad) {
                c._iniLazy(function () {
                    if (c.imgArray.length == 0) {
                        return k
                    }
                    c._lazyImg(c.imgArray, a)
                })
            }
            if (a.load) {
                c._loadImg(l)
            }
            return b
        }, _loadImg: function (l) {
            var b = this, c = b.param.lazyImg, j = c.attr, k = c.ltime, a = c.lnum;
            (function (g, p, h, i, q) {
                var r = setInterval(function () {
                    if (g.isBusy) {
                        return false
                    }
                    var m = g.imgArray;
                    var n = m.length;
                    if (n > q) {
                        g._imgLoad(m, 0, q, h)
                    } else {
                        if (n > 0) {
                            g._imgLoad(m, 0, n, h)
                        } else {
                            clearInterval(r)
                        }
                    }
                }, i)
            })(b, l, j, k, a)
        }, _lazyImg: function (o, a) {
            var m = a.attr, b = o.length, c = this, p = 0, l = 1;
            c.isBusy = true;
            var n = c._pageTop();
            c._imgLoad(c.imgArray, p, b, m, n, a.hfix);
            c.isBusy = false
        }, _imgLoad: function (i, b, t, q, u, s) {
            var v = this;
            if (u) {
                for (var p = b; p < t; p++) {
                    var c = d(i[p]);
                    var r = jQuery(window).height() + s;
                    if (c.offset().top < (u + s) && (u - c.offset().top) < r) {
                        v._renderImg(c, q);
                        delete i[p]
                    }
                }
            } else {
                for (var p = b; p < t; p++) {
                    var c = d(i[p]);
                    v._renderImg(c, q);
                    delete i[p]
                }
            }
            var a = new Array();
            for (var p = 0; p < i.length;
                 p++) {
                if (i[p]) {
                    a.push(i[p])
                }
            }
            v.imgArray = a
        }, _renderImg: function (b) {
            var a = this.param.lazyImg;
            var c = a.wideAttr;
            var i = a.attr;
            var j = typeof isWidescreen != "undefined" ? isWidescreen : false;
            if (j) {
                if (c && b.attr(c)) {
                    b.attr("src", loli.webp(b.attr(c), b.attr("data-nwp"))).attr("data-imgattr", c)
                } else {
                    if (i && b.attr(i)) {
                        b.attr("src", loli.webp(b.attr(i), b.attr("data-nwp"))).attr("data-imgattr", i)
                    } else {
                        if (b.attr("original")) {
                            b.attr("src", loli.webp(b.attr("original"), b.attr("data-nwp"))).attr("data-imgattr", "original")
                        }
                    }
                }
            } else {
                if (i && b.attr(i)) {
                    b.attr("src", loli.webp(b.attr(i), b.attr("data-nwp"))).attr("data-imgattr", i)
                } else {
                    if (c && b.attr(c)) {
                        b.attr("src", loli.webp(b.attr(c), b.attr("data-nwp"))).attr("data-imgattr", c)
                    } else {
                        if (b.attr("original")) {
                            b.attr("src", loli.webp(b.attr("original"), b.attr("data-nwp"))).attr("data-imgattr", "original")
                        }
                    }
                }
            }
            b.removeAttr(c).removeAttr(i).removeAttr("original")
        }, _iniLazy: function (b) {
            var a = this;
            loli.delay(window, "scroll", function () {
                if (!a.isBusy) {
                    a.isBusy = true;
                    return true
                } else {
                    return false
                }
            }, function () {
                b()
            }, 50)
        }, _pageTop: function () {
            var c = this, a = c.doc, b = a.documentElement;
            return b.clientHeight + Math.max(b.scrollTop, a.body.scrollTop)
        }, _hashImgUrl: function (a) {
            if (loli && loli.util) {
                return loli.util.hashImgUrl(a)
            }
            return a
        }
    };
    var f = new e();
    d.fn.extend({
        lazyImg: function (a) {
            var b = new e();
            return b.lazyImg(this, a)
        }
    })
})(jQuery);
(function () {
    function b(a) {
        this.option = {
            container: null,
            content: null,
            trigger: null,
            pageButton: [],
            steps: 1,
            effect: "visible",
            autoPlay: false,
            interval: 3000,
            activeClass: "on",
            speed: 300,
            eventType: "mouseover",
            delay: 0,
            index: 0
        };
        $.extend(this.option, a);
        this.box = $(this.option.container);
        if (this.box.length == 0) {
            return false
        }
        this.sprite = this.box.find(this.option.content);
        if (this.sprite.length == 0) {
            return false
        }
        this.trig = this.box.find(this.option.trigger).children();
        this.btnLast = this.box.find(this.option.pageButton[0]);
        this.btnNext = this.box.find(this.option.pageButton[1]);
        this.items = this.sprite.children();
        if (this.items.length == 0) {
            return false
        }
        this.total = this.items.length;
        if (this.total <= this.option.steps) {
            return false
        }
        this.page = Math.ceil(this.total / this.option.steps);
        this.width = this.items.eq(0).outerWidth(true);
        this.height = this.items.eq(0).outerHeight(true);
        this.index = this.option.index;
        this.timer = 0;
        this.handlers = {};
        this.init()
    }

    b.prototype = {
        init: function () {
            this.initStyle();
            this.cutover(0);
            this.bindUI();
            this.autoPlay()
        }, on: function (d, a) {
            if (typeof this.handlers[d] == "undefined") {
                this.handlers[d] = []
            }
            this.handlers[d].push(a);
            return this
        }, fire: function (h, g) {
            if (this.handlers[h] instanceof Array) {
                var j = this.handlers[h];
                for (var i = 0, a = j.length; i < a; i++) {
                    j[i](g)
                }
            }
        }, initStyle: function () {
            var a = function (c) {
                for (var d = 0; d < c.option.steps; d++) {
                    c.items.eq(c.total - (d + 1)).clone().prependTo(c.sprite);
                    c.items.eq(d).clone().appendTo(c.sprite)
                }
            };
            switch (this.option.effect) {
                case"scrollx":
                    a(this);
                    this.sprite.css({
                        width: this.sprite.children().length * this.width,
                        left: -this.option.steps * this.width
                    });
                    this.sprite.children().css("float", "left");
                    break;
                case"scrolly":
                    a(this);
                    this.sprite.css({top: -this.option.steps * this.height});
                    break;
                case"fade":
                    this.items.css({position: "absolute", zIndex: 0}).eq(this.index).css({zIndex: 1});
                    break;
                case"visible":
                    this.items.css({display: "none"}).eq(this.index).css({display: "block"});
                    break
            }
            var e = this;
            var f = setTimeout(function () {
                clearTimeout(f);
                e.fire("init")
            }, 30)
        }, cutover: function (i) {
            var h = (i == null) ? this.option.speed : 0;
            var g = this.index != this.page ? this.index : 0;
            this.trig.eq(g).addClass(this.option.activeClass).siblings().removeClass(this.option.activeClass);
            switch (this.option.effect) {
                case"visible":
                    this.items.css({display: "none"}).eq(g).css({display: "block"});
                    break;
                case"fade":
                    this.items.css({position: "absolute", zIndex: 0}).fadeOut(h);
                    this.items.eq(g).css({zIndex: 1}).fadeIn(h);
                    break;
                case"scrollx":
                    var a = this.width * this.option.steps;
                    this.sprite.stop().animate({left: -a * this.index - a}, h);
                    break;
                case"scrolly":
                    var j = this.height * this.option.steps;
                    this.sprite.stop().animate({top: -j * this.index - j}, h);
                    break
            }
            this.fire("cutover", g)
        }, bindUI: function () {
            var e = this;
            var f = 0;
            this.trig.bind(this.option.eventType, function () {
                var c = this;
                if (e.option.eventType == "mouseover" || e.option.eventType == "mouseenter") {
                    if (e.index == $(c).index()) {
                        return
                    }
                    clearTimeout(f);
                    f = setTimeout(function () {
                        e.index = $(c).index();
                        e.cutover();
                        clearTimeout(f)
                    }, e.option.delay)
                } else {
                    e.index = $(this).index();
                    e.cutover()
                }
            });
            this.btnLast.click(function () {
                e.lastPage()
            });
            this.btnNext.click(function () {
                e.nextPage()
            });
            function a(q, o, p, c) {
                var r = 0, m = 0, d = 0, n = 0;
                q.off("touchstart touchend").on({
                    touchstart: function (h) {
                        var g = h.originalEvent.changedTouches[0];
                        r = g.pageX;
                        m = g.pageY;
                        if (c) {
                            c(r, m)
                        }
                    }, touchmove: function (h) {
                        var g = h.originalEvent.changedTouches[0];
                        d = g.pageX;
                        n = g.pageY;
                        if (Math.abs(d - r) > Math.abs(n - m)) {
                            if (p) {
                                p(d - r, n - m)
                            }
                            h.preventDefault()
                        }
                    }, touchend: function (h) {
                        var g = h.originalEvent.changedTouches[0];
                        d = g.pageX;
                        n = g.pageY;
                        if (Math.abs(d - r) > Math.abs(n - m)) {
                            if (d - r > 0) {
                                if (o) {
                                    o("right")
                                }
                            } else {
                                o("left")
                            }
                        } else {
                            if (n - m > 0) {
                                o("down")
                            } else {
                                o("up")
                            }
                        }
                    }
                })
            }

            a(this.box, function (c) {
                if (c == "left") {
                    e.nextPage();
                    clearInterval(e.timer);
                    e.autoPlay()
                }
                if (c == "right") {
                    e.lastPage();
                    clearInterval(e.timer);
                    e.autoPlay()
                }
            });
            this.box.bind({
                mouseenter: function () {
                    e.btnLast.show();
                    e.btnNext.show();
                    clearInterval(e.timer)
                }, mouseleave: function () {
                    e.btnLast.hide();
                    e.btnNext.hide();
                    e.autoPlay()
                }
            })
        }, lastPage: function () {
            this.index--;
            if (this.index < -1) {
                this.index = this.page - 1;
                this.cutover(0);
                this.index = this.page - 2
            }
            this.cutover()
        }, nextPage: function () {
            this.index++;
            if (this.index > this.page) {
                this.index = 0;
                this.cutover(0);
                this.index = 1
            }
            this.cutover()
        }, autoPlay: function () {
            var a = this;
            if (!this.option.autoPlay) {
                return false
            }
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                a.nextPage()
            }, this.option.interval)
        }
    };
    window.Switchable = b
})();
(function () {
    function f(a) {
        if (a && typeof(a) == "string") {
            return a.replace(/(^\s*)|(\s*$)/g, "")
        } else {
            return a
        }
    }

    function j() {
        if (typeof(localStorage) == "undefined") {
            return false
        }
        var a = localStorage.getItem("webp");
        if (a) {
            return true
        }
        var c = document.createElement("canvas");
        if (!!(c.getContext && c.getContext("2d"))) {
            var b = c.toDataURL("image/webp").indexOf("data:image/webp") == 0;
            if (b) {
                localStorage.setItem("webp", true)
            }
            return b
        } else {
            return false
        }
    }

    var g = false;
    try {
        g = j()
    } catch (h) {
    }
    function i(a, c) {
        if (typeof(__cannotWebp) != "undefined" && __cannotWebp) {
            return a
        }
        if (c) {
            return a
        }
        if (!g || !a) {
            return a
        }
        a = f(a);
        var d = /^[https:]*\/\/d(\d+).(yihaodian||yhd)[img]*.com/;
        if (a.search(d) == -1) {
            return a
        }
        var b = a.split(".");
        if (b.length > 1) {
            if (b[b.length - 1].toLowerCase() == "gif") {
                return a
            }
            b[b.length - 1] = "webp"
        }
        return b.join(".")
    }

    loli.webp = i
})();
(function () {
    var u = window.loli || (window.loli = {});
    var n = "localStorage", y = "sessionStorage", r = {}, o = {};
    r.set = function (b, a) {
    };
    r.get = function (a) {
    };
    r.remove = function (a) {
    };
    r.clear = function () {
    };
    o.set = function (b, a) {
    };
    o.get = function (a) {
    };
    o.remove = function (a) {
    };
    o.clear = function () {
    };
    function q(b) {
        try {
            if (b in window && window[b]) {
                localStorage.setItem("__testLocal", "1");
                var c = localStorage.getItem("__testLocal");
                return c
            }
            return false
        } catch (a) {
            return false
        }
    }

    function z(b, a) {
        var c = window[b];
        a.set = function (e, d) {
            if (d === undefined) {
                return c.remove(e)
            }
            c.setItem(e, d);
            return d
        };
        a.get = function (d) {
            return c.getItem(d)
        };
        a.remove = function (d) {
            c.removeItem(d)
        };
        a.clear = function () {
            c.clear()
        }
    }

    if (q(n)) {
        z(n, r)
    }
    if (q(y)) {
        z(y, o)
    }
    var v = function () {
        var d = false;
        var a = document.domain;
        var c = /([^\.]*)\.yhd\.com/;
        if (c.test(a)) {
            var b = c.exec(a)[1];
            if (b == "www") {
                d = true
            }
        }
        return d
    };
    var s = function () {
        var a = window.navigator.userAgent.toLowerCase();
        var c = /msie ([\d\.]+)/;
        if (c.test(a)) {
            var b = parseInt(c.exec(a)[1]);
            return b
        }
        return 0
    };
    var w = function () {
        var b = window.navigator.userAgent.toLowerCase();
        var a = /safari/i;
        var c = /chrome/i;
        var d = /Android/i;
        if (a.test(b) && !c.test(b) && !d.test(b)) {
            return true
        }
        return false
    };
    var p = function () {
        var a = new Date();
        return (a.getYear() + 1900) + "" + (a.getMonth() + 1) + "" + a.getDate()
    };
    var x = function (e, f, a, h) {
        var d = a || function () {
            };
        var k = (h && h == "session") ? o : r;
        if (v()) {
            var b = k.set(e, f);
            d({status: 1, key: e, value: b})
        } else {
            if (w() && h != "session") {
                var c = /^[%,_:~\!\*\(\)\'\-\.\|\w]+$/;
                if (f != null) {
                    if (c.test(f)) {
                        $.cookie(e, f, {domain: "yhd.com", path: "/", expires: 30})
                    } else {
                        $.cookie(e, encodeURIComponent(f), {domain: "yhd.com", path: "/", expires: 30})
                    }
                }
                d({status: 1, key: e, value: f});
                return
            }
            if (!window.postMessage || !window.addEventListener) {
                d({status: 0, key: e, value: null});
                return
            }
            var i = "globalLocalStorageAdaptorForSet";
            var m = $("#" + i);
            if (m.size() == 0) {
                var j = document.createElement("iframe");
                j.setAttribute("id", i);
                j.setAttribute("style", "display:none");
                j.setAttribute("src", window.location.protocol + "//www.yhd.com/html/setLocalStorage.html?v=" + p());
                document.body.appendChild(j);
                m = $("#" + i)
            }
            var g = function (D) {
                var F = window.location.protocol + "//www.yhd.com";
                var E = {key: e, value: f, type: h, op: "storage"};
                if (s() == 9) {
                    E = '{"key":"' + e + '", "value":"' + f + '", "type":"' + h + '", "op":"storage"}'
                }
                D.postMessage(E, F);
                d({status: 1, key: e, value: f})
            };
            if (m.attr("loaded")) {
                var l = m.get(0).contentWindow;
                g(l)
            } else {
                m.load(function () {
                    $(this).attr("loaded", "1");
                    var B = $(this).get(0).contentWindow;
                    g(B)
                })
            }
        }
    };
    var t = function (c, B, f) {
        var a = B || function () {
            };
        var j = (f && f == "session") ? o : r;
        if (v()) {
            var b = j.get(c);
            a({status: 1, key: c, value: b})
        } else {
            if (w() && f != "session") {
                var b = $.cookie(c);
                if (b !== null) {
                    b = decodeURIComponent(b)
                }
                a({status: 1, key: c, value: b});
                return
            }
            if (!window.postMessage || !window.addEventListener) {
                a({status: 0, key: c, value: null});
                return
            }
            var g = window.yhd_storage_get_callback || (window.yhd_storage_get_callback = []);
            g.push(a);
            var i = g.length - 1;
            var e = "globalLocalStorageAdaptorForGet";
            var m = $("#" + e);
            if (m.size() == 0) {
                var k = document.createElement("iframe");
                k.setAttribute("id", e);
                k.setAttribute("style", "display:none");
                k.setAttribute("src", window.location.protocol + "//www.yhd.com/html/getLocalStorage.html?v=" + p());
                document.body.appendChild(k);
                m = $("#" + e)
            }
            var d = function (G) {
                var F = window.location.protocol + "//www.yhd.com";
                var A = window.location.protocol + "//" + window.location.host;
                var H = {key: c, host: A, version: i, type: f, op: "storage"};
                if (s() == 9) {
                    H = '{"key":"' + c + '", "host":"' + A + '", "version":"' + i + '", "type":"' + f + '", "op":"storage"}'
                }
                G.postMessage(H, F)
            };
            if (m.attr("loaded")) {
                var l = m.get(0).contentWindow;
                d(l)
            } else {
                m.load(function () {
                    $(this).attr("loaded", "1");
                    var A = $(this).get(0).contentWindow;
                    d(A)
                })
            }
            var h = function (J) {
                var A = /^http[s]?:\/\/([\.\w]*)\.yhd\.com/i;
                var G = /^http[s]?:\/\/([\.\w]*)\.yihaodian\.com\.hk/i;
                if (A.test(J.origin) || G.test(J.origin)) {
                    var I = J.data;
                    if (I) {
                        if (typeof I == "string") {
                            I = $.parseJSON(I)
                        }
                        if (I.op != "storage") {
                            return
                        }
                        var H = g[I.version];
                        if (H) {
                            H({status: 1, key: I.key, value: I.value})
                        } else {
                            a({status: 1, key: I.key, value: I.value})
                        }
                    }
                }
            };
            if (!window.yhd_storage_get_handler) {
                window.addEventListener("message", h);
                window.yhd_storage_get_handler = h
            }
        }
    };
    r.isRoot = v;
    r.isIE = s;
    r.setFromRoot = function (b, c, a) {
        x(b, c, a, "local")
    };
    r.getFromRoot = function (b, a) {
        t(b, a, "local")
    };
    o.setFromRoot = function (b, c, a) {
        x(b, c, a, "session")
    };
    o.getFromRoot = function (b, a) {
        t(b, a, "session")
    };
    u.yhdStore = r;
    u.yhdSessionStore = o
})();
var initMenu = (function () {
    function b(a, d) {
        return (d.y - a.y) / (d.x - a.x)
    }

    return function (A) {
        var z = $(this), t = null, y = [], B = null, x = null, E = $.extend({
            rowSelector: "> li",
            submenuSelector: "*",
            submenuDirection: "right",
            tolerance: 75,
            enter: $.noop,
            exit: $.noop,
            activate: $.noop,
            deactivate: $.noop,
            exitMenu: $.noop
        }, A);
        if (A.isDestroy) {
            z.find(E.rowSelector).unbind();
            $(document).unbind("mousemove")
        } else {
            var a = 3, s = 300;
            var v = function (c) {
                y.push({x: c.pageX, y: c.pageY});
                if (y.length > a) {
                    y.shift()
                }
            };
            var C = function () {
                if (x) {
                    clearTimeout(x)
                }
                if (E.exitMenu(this)) {
                    if (t) {
                        E.deactivate.call(t)
                    }
                    t = null
                }
            };
            var G = function () {
                if (x) {
                    clearTimeout(x)
                }
                E.enter(this);
                w(this)
            }, H = function () {
                E.exit(this)
            };
            var F = function () {
                u(this)
            };
            var u = function (c) {
                if (c == t) {
                    return
                }
                if (t) {
                    E.deactivate.call(t)
                }
                E.activate.call(c);
                t = c
            };
            var w = function (c) {
                var d = D();
                if (d) {
                    x = setTimeout(function () {
                        w(c)
                    }, d)
                } else {
                    u(c)
                }
            };
            var D = function () {
                if (!t || !$(t).is(E.submenuSelector)) {
                    return 0
                }
                var h = z.offset(), o = {x: h.left, y: h.top - E.tolerance}, n = {x: h.left + z.outerWidth(), y: o.y},
                    l = {x: h.left, y: h.top + z.outerHeight() + E.tolerance}, g = {x: h.left + z.outerWidth(), y: l.y},
                    f = y[y.length - 1], c = y[0];
                if (!f) {
                    return 0
                }
                if (!c) {
                    c = f
                }
                if (c.x < h.left || c.x > g.x || c.y < h.top || c.y > g.y) {
                    return 0
                }
                if (B && f.x == B.x && f.y == B.y) {
                    return 0
                }
                var d = n, k = g;
                if (E.submenuDirection == "left") {
                    d = l;
                    k = o
                } else {
                    if (E.submenuDirection == "below") {
                        d = g;
                        k = l
                    } else {
                        if (E.submenuDirection == "above") {
                            d = o;
                            k = n
                        }
                    }
                }
                var j = b(f, d), e = b(f, k), m = b(c, d), i = b(c, k);
                if (j < m && e > i) {
                    B = f;
                    return s
                }
                B = null;
                return 0
            };
            z.mouseleave(C).find(E.rowSelector).unbind().mouseenter(G).mouseleave(H).click(F);
            $(document).mousemove(v);
            z.find(E.rowSelector).one("mousemove", G)
        }
    }
})();
$.fn.yhdMenu = function (b) {
    return this.each(function () {
        initMenu.call(this, b)
    })
};
define("header", function () {
    var b = {};
    b.ieLower = "undefined" == typeof(document.body.style.maxHeight);
    b.isNarrowscreen = screen.width < 1228;
    b.maxHeight = function (a, h) {
        if (b.ieLower) {
            var f = $(a).height();
            var g = parseInt(h);
            if (f > g) {
                $(a).height(g)
            }
        }
    };
    b.maxWidth = function (a, h) {
        if (b.ieLower) {
            var f = $(a).width();
            var g = parseInt(h);
            if (f > g) {
                $(a).width(g)
            }
        }
    };
    b.topbarHover = function () {
        $(".hd_topbar_right").on("mouseenter", ".hd_has_child", function () {
            var a = $(this);
            a.addClass("hd_cur")
        });
        $(".hd_topbar_right").on("mouseleave", ".hd_has_child", function () {
            var a = $(this);
            a.removeClass("hd_cur")
        })
    };
    b.privilegeSlide = function () {
        b.leftRightSlide(".hd_top_bar .hd_privilege_wrap", 1, 4, 300)
    };
    b.leftRightSlide = function (s, o, n, w) {
        var t = $(s), u = t.find(".hd_privilege_list"), v = u.children(), r = o, q = v.length, x = v.outerWidth(true);
        if (q > n) {
            t.addClass("hd_privilege_slide");
            v.slice(q - 1, q).prependTo(u);
            u.css({left: -x});
            function p() {
                u.stop(true, true).animate({marginLeft: -x}, w, function () {
                    u.css({marginLeft: 0}).children().slice(0, o).appendTo(u)
                })
            }

            function a() {
                u.stop(true, true).animate({marginLeft: x}, w, function () {
                    u.css({marginLeft: 0}).children().slice(q - 1, q).prependTo(u)
                })
            }

            t.on("click", ".next_btn", function () {
                p()
            });
            t.on("click", ".prev_btn", function () {
                a()
            })
        }
    };
    b.singIn = function () {
        $(".mod_personal_center").on("click", ".sign_in", function () {
            var m = $(this);
            if (!m.hasClass("already_sign_in")) {
                m.addClass("already_sign_in");
                m.find("a").text("å·²ç­¾åˆ°");
                var j = $(".gold_coin").find(".add_coin");
                $("img", j).removeAttr("src").attr("src", "images/add_coin.gif");
                j.show();
                var k = $(".gold_coin").find("em");
                var a = parseInt(k.text());
                var i = 6;
                var n = 1;
                var l = setInterval(function () {
                    if (n < i) {
                        k.text(a + n);
                        n++
                    } else {
                        clearInterval(l);
                        var c = setTimeout(function () {
                            $(".add_coin").hide()
                        }, 500)
                    }
                }, 120)
            }
        })
    };
    b.modAreaSelect = function () {
        $(".yhd_area_select").each(function () {
            var t = this;
            t.isOpen = false;
            var n = $(this).find(".yhd_address");
            var o = $(this).find(".yhd_tab_detail");
            var s = $(this).find(".yhd_area_tab span");
            var p = $(this).find(".yhd_area_box .yhd_item");
            var a = $(this).find(".yhd_val_text");
            var r = {
                a: s.eq(0).attr("data-val") || "è¯·é€‰æ‹©çœä»½",
                b: s.eq(1).attr("data-val") || "è¯·é€‰æ‹©å¸‚",
                c: s.eq(2).attr("data-val") || "è¯·é€‰æ‹©åŒº"
            };
            n.click(function (c) {
                var d = $(".hd_cart_show .hd_cart_scrollwrap").outerHeight();
                if (d > $(".hd_cart_list").height() + $(".hd_area_wrap").outerHeight()) {
                    $(".yhd_tab_detail", ".hd_cart_show").css("width", "334px")
                } else {
                    $(".yhd_tab_detail", ".hd_cart_show").css("width", "317px")
                }
                if (!$(this).hasClass("select")) {
                    $(".hd_cart_show .hd_cart_scrollwrap").css("position", "static");
                    $(this).addClass("select");
                    o.slideDown();
                    $(".hd_area_mask").show();
                    q(0);
                    t.isOpen = true;
                    $(".hd_area_mask,.hd_tab_detail").mousewheel(function (f, e) {
                        f.preventDefault()
                    })
                } else {
                    $(".hd_cart_show .hd_cart_scrollwrap").css("position", "relative");
                    $(this).removeClass("select");
                    o.slideUp();
                    $(".hd_area_mask").hide();
                    t.isOpen = false
                }
            });
            $(document).click(function (c) {
                if (!t.isOpen) {
                    return
                }
                var d = $(c.target);
                if (d.parents(".yhd_area_select").length == 0 || d.is(".yhd_close_btn")) {
                    $(".hd_cart_show .hd_cart_scrollwrap").css("position", "relative");
                    n.removeClass("select");
                    o.slideUp();
                    $(".hd_area_mask").hide();
                    t.isOpen = false;
                    $(t).css({position: "relative", top: 0})
                }
            });
            s.click(function () {
                var c = $(this).index();
                q(c)
            });
            $(this).click(function (d) {
                var e = $(d.target);
                if (e.is("a")) {
                    var c = e.parents(".yhd_item");
                    if (c.hasClass("yhd_first_area")) {
                        r.a = e.attr("data-val");
                        q(1)
                    }
                    if (c.hasClass("yhd_second_area")) {
                        r.b = e.attr("data-val");
                        q(2)
                    }
                    if (c.hasClass("yhd_third_area")) {
                        r.c = e.attr("data-val");
                        m();
                        $(t).css({position: "relative", top: 0});
                        $(t).find(".yhd_address").removeClass("select")
                    }
                    l();
                    c.find("dd").removeClass("yhd_on");
                    e.addClass("yhd_on")
                }
            });
            var q = function (e, c, d) {
                s.eq(e).addClass("yhd_on").siblings().removeClass("yhd_on");
                p.hide().eq(e).show()
            };
            var m = function () {
                $(".hd_cart_show .hd_cart_scrollwrap").css("position", "relative");
                n.removeClass("select");
                o.slideUp();
                $(".hd_area_mask").hide();
                var c = r.a + r.b + r.c;
                a.html(c);
                l()
            };
            var l = function () {
                s.eq(0).attr("data-val", r.a).find("em").html(r.a);
                s.eq(1).attr("data-val", r.b).find("em").html(r.b);
                s.eq(2).attr("data-val", r.c).find("em").html(r.c)
            };
            m()
        })
    };
    b.channelHeader = function () {
        if ($(".hd_channel_allsort").length > 0) {
            $(".hd_channel_allsort").hover(function () {
                $(this).addClass("hd_ch_allsort_show")
            }, function () {
                $(this).removeClass("hd_ch_allsort_show")
            });
            $(".hd_ch_allsort li").hover(function () {
                $(this).addClass("cur")
            }, function () {
                $(this).removeClass("cur")
            })
        }
    };
    b.commonHeader = function () {
        if ($(".hd_cm_global").length > 0 && $(".hd_cm_wrap").length > 0) {
            $(".hd_cm_allsort_wrap").hover(function () {
                $(this).addClass("hd_cm_allsort_show")
            }, function () {
                $(this).removeClass("hd_cm_allsort_show")
            });
            $(".hd_cm_allsort li").hover(function () {
                $(this).addClass("cur")
            }, function () {
                $(this).removeClass("cur")
            });
            var a = $(".hd_cm_wrap").offset().top;
            $(window).scroll(function () {
                var d = $(this).scrollTop();
                if (d > a) {
                    $(".hd_cm_wrap").addClass("hd_cm_fixed");
                    if ($(".headerNav_box").length == 0) {
                        $(".hd_header_nav").after('<p class="headerNav_box"></p>')
                    }
                } else {
                    $(".headerNav_box").remove();
                    $(".hd_cm_wrap").removeClass("hd_cm_fixed")
                }
            })
        }
    };
    b.navFixed = function () {
        if (!$(".hd_header").hasClass("hd_channel_header") && !$(".hd_header").hasClass("hd_city_header") && !$(".hd_header").hasClass("hd_cm_global") && !$(".hd_header").hasClass("hd_shop_global") && !$(".hd_header").hasClass("hd_brand_global")) {
            if (!$(".mod_seckill").offset()) {
                return
            }
            var a = $(".mod_seckill").offset().top;
            var d = $(".hd_search_form");
            $(window).scroll(function () {
                var c = $(this).scrollTop();
                if (c > a) {
                    if (!d.hasClass("hd_search_fixed")) {
                        $(".hd_search_tips_result").hide();
                        $(".hd_head_search").css("z-index", "950");
                        d.css("top", "-70px");
                        d.addClass("hd_search_fixed");
                        $(".hd_search_fixed").animate({top: 0}, 500, function () {
                        })
                    }
                } else {
                    d.removeClass("hd_search_fixed");
                    $(".hd_head_search").css("z-index", "501")
                }
            })
        }
    };
    b.categoryMenuDelay = function () {
        var d;
        var a = $("#J_allsort");
        $("#J_allsort").hover(function () {
            d = setTimeout(function () {
                a.yhdMenu({
                    isDestroy: false, activate: function (c) {
                        $(this).addClass("cur")
                    }, deactivate: function (c) {
                        $(this).removeClass("cur")
                    }, exitMenu: function () {
                        return true
                    }
                })
            }, 200)
        }, function () {
            clearTimeout(d);
            a.yhdMenu({isDestroy: true})
        })
    };
    b.searchFocus = function (a) {
        $(a).focus(function () {
            $(this).parent("div").find("label").css({color: "#CCCCCC"})
        });
        $(a).keydown(function () {
            $(this).parent("div").find("label").hide()
        });
        $(a).blur(function () {
            if ($(this).val() == "") {
                $(this).parents("div").find("label").show().css({color: "#aaaaaa"}).text("")
            }
            if (a == "#fix_keyword") {
                $(this).removeClass("focus_ipt")
            }
        })
    }, b.liObj = {keyIndex: -1};
    b.searchListHover = function (f) {
        var a = $("#searchSuggest ul li");
        var h, g;
        $("a.s_cart_btn").hide();
        $(this).find("hd_property_list");
        a.on("mouseenter", function () {
            var d = a.index(this);
            var c = $(this);
            clearTimeout(g);
            h = setTimeout(function () {
                if (c.hasClass("haslist")) {
                    c.addClass("select_haslist").siblings().removeClass("select_haslist select");
                    b.maxHeight(".hd_total_sort .hd_property_list", "178")
                } else {
                    c.addClass("select").siblings().removeClass("select_haslist select")
                }
                f.keyIndex = d
            }, 200)
        });
        a.on("mouseleave", function () {
            var c = $(this);
            clearTimeout(h);
            g = setTimeout(function () {
                c.removeClass("select select_haslist")
            }, 100)
        });
        $(".choose_list dd").on("mouseover", function () {
            $(this).find(".s_cart_btn").show();
            return false
        });
        $(".choose_list dd").on("mouseout", function () {
            $(this).find(".s_cart_btn").hide();
            return false
        })
    };
    b.keyAction = function (a) {
        $(".hd_search_ipt").keydown(function (j) {
            var k = $("#searchSuggest ul li");
            var l = k.length;
            var h = a.keyIndex;
            if (j.keyCode == "40") {
                h++;
                if (h >= l) {
                    h = 0
                }
            } else {
                if (j.keyCode == "38") {
                    h--
                }
            }
            if (j.keyCode == "40" || j.keyCode == "38") {
                a.keyIndex = h;
                var i = $(".hd_search_tips_result > ul > li").eq(h);
                if (i.hasClass("haslist")) {
                    i.addClass("select_haslist").siblings().removeClass("select_haslist select");
                    b.maxHeight(".hd_total_sort .hd_property_list", "178")
                } else {
                    i.addClass("select").siblings().removeClass("select_haslist select")
                }
                $("#keyword").val(i.text())
            } else {
                $(".hd_search_tips_result > ul > li").unbind("mouseover")
            }
        })
    };
    b.searchBoxShowHide = function (f, a) {
        var a = $(a);
        var e = $(f).parents(a).find(".hd_search_tips_result");
        $(f).focus(function () {
            if (!a.hasClass("hd_search_fixed")) {
                $(e).show();
                $(e).find(".hd_search_history_new").show()
            }
            $("#searchSuggest ul").css("height", "");
            return false
        });
        $(f).keyup(function (c) {
            if (!a.hasClass("hd_search_fixed")) {
                $(e).find(".hd_search_history_new").hide();
                $(e).find("ul").show()
            }
        });
        $(a).bind("mouseleave", function () {
            if (!a.hasClass("hd_search_fixed")) {
                $(e).find(".hd_search_history_new").hide();
                $(e).find("ul").hide()
            }
        })
    };
    b.searchListClick = function (h) {
        var a = $("#searchSuggest ul li");
        var f = b.liObj.keyIndex;
        var g = $(".hd_search_tips_result > ul > li");
        g.bind("click", function () {
            $(h).val($(this).text());
            searchMe($(h), "0", "0")
        })
    };
    b.lamuShow = function () {
        var j = $(".big_topbanner"), g = $(".small_topbanner"), h = $(".mod_topbanner_wrap");
        var a, i;
        h.hover(function () {
            clearTimeout(i);
            a = setTimeout(function () {
                if (!j.is(":animated") && !g.is(":animated")) {
                    g.slideUp();
                    j.slideDown()
                }
            }, 300)
        }, function () {
            clearTimeout(a);
            i = setTimeout(function () {
                if (!j.is(":animated") && !g.is(":animated")) {
                    g.slideDown();
                    j.slideUp()
                }
            }, 300)
        });
        h.on("click", ".close_btn", function () {
            h.slideUp()
        })
    };
    b.noticeShow = function () {
        if ($("li", ".hd_header_notice").length > 1) {
            var a;
            $(".hd_header_notice").hover(function () {
                clearInterval(a)
            }, function () {
                a = setInterval(function () {
                    var e = $(".hd_header_notice ul:first");
                    var f = e.find("li:first").height();
                    e.animate({marginTop: -f + "px"}, 500, function () {
                        e.css({marginTop: 0}).find("li:first").appendTo(e)
                    })
                }, 5000)
            }).trigger("mouseleave")
        }
        $(".hd_header_wrap").on("click", ".hd_notice_close", function () {
            $(".hd_header_notice").hide()
        })
    };
    b.jsAdPopClose = function () {
        $(".advertisement_wrap").on("click", ".close_btn", function () {
            $(this).parents(".advertisement_wrap").fadeOut()
        })
    };
    b.cJsMenu = function () {
        if ($(".home_menu_warp")) {
            var g = $(".home_menu_warp"), a = g.find(".h_menu_ul"), i = g.find(".home_drop_box"),
                h = g.find(".h_drop_ul");
            a.children("li").on("mouseover", function () {
                var c = $(this), d = c.attr("data-tip");
                c.addClass("cur").siblings().removeClass("cur");
                if (d !== undefined) {
                    i.show();
                    h.show().find("li[data-tip=" + d + "]").stop(true, true).fadeIn().siblings().hide()
                } else {
                    i.hide();
                    h.hide().find("li").hide()
                }
            });
            g.on("mouseleave", j);
            function j() {
                a.children("li").removeClass("cur");
                h.hide().find("li").hide()
            }
        }
    };
    b.shopDsr = function () {
        if ($(".hd_shop_global")) {
            $(".hd_shop_dsr").hover(function () {
                $(this).addClass("hd_dsr_show")
            }, function () {
                $(this).removeClass("hd_dsr_show")
            });
            $(".hd_shop_phone_wrap").on("mouseenter", function () {
                $(this).addClass("hd_code_show")
            });
            $(".hd_shop_phone_wrap").on("mouseleave", function () {
                $(this).removeClass("hd_code_show")
            })
        }
    };
    b.brandHeader = function () {
        if ($(".hd_brand_global")) {
            $(".hd_brand_global").on("mouseenter", ".hd_attent", function () {
                $(this).find("span").text("15004")
            });
            $(".hd_brand_global").on("mouseleave", ".hd_attent", function () {
                if ($(this).hasClass("hd_attented")) {
                    $(this).find("span").text("å·²å…³æ³¨")
                } else {
                    $(this).find("span").text("å…³æ³¨")
                }
            });
            $(".hd_brand_global").on("click", ".hd_attent", function () {
                if ($(this).hasClass("hd_attented")) {
                    $(this).removeClass("hd_attented").find("span").text("å…³æ³¨")
                } else {
                    $(this).addClass("hd_attented").find("span").text("å·²å…³æ³¨")
                }
            })
        }
    };
    b.init = function () {
        b.topbarHover();
        b.privilegeSlide();
        b.maxWidth(".hd_login_name", "156");
        b.singIn();
        b.modAreaSelect();
        b.channelHeader();
        b.commonHeader();
        b.navFixed();
        b.categoryMenuDelay();
        b.search();
        b.lamuShow();
        b.jsAdPopClose();
        b.cJsMenu();
        b.maxWidth(".hd_shop_info .hd_shop_name", "120");
        b.shopDsr();
        b.brandHeader();
        b.noticeShow()
    };
    b.search = function () {
        b.liObj = {keyIndex: -1};
        b.searchFocus(".hd_search_ipt");
        b.searchListHover(b.liObj);
        b.keyAction(b.liObj);
        b.searchBoxShowHide(".hd_search_ipt", ".hd_search_form");
        b.searchListClick(".hd_search_ipt")
    };
    return b
});
$(document).ready(function () {
    require(["header"], function (b) {
        b.init()
    })
});
function setHomepage() {
    if (document.all) {
        document.body.style.behavior = "url(#default#homepage)";
        document.body.setHomePage(httpUrl)
    } else {
        if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                } catch (c) {
                    alert("è¯¥æ“ä½œè¢«æµè§ˆå™¨æ‹’ç»ï¼Œå¦‚æžœæƒ³å¯ç”¨è¯¥åŠŸèƒ½ï¼Œè¯·åœ¨åœ°å€æ å†…è¾“å…¥ about:config,ç„¶åŽå°†é¡¹ signed.applets.codebase_principal_support å€¼è¯¥ä¸ºtrue")
                }
            }
            var d = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
            d.setCharPref("browser.startup.homepage", httpUrl)
        }
    }
}
function bookmark() {
    var e;
    var i = /^http{1}s{0,1}:\/\/([a-z0-9_\\-]+\.)+(yihaodian|1mall|111|yhd){1}\.(com|com\.cn){1}\?(.+)+$/;
    if (i.test(httpUrl)) {
        e = "&ref=favorite"
    } else {
        e = "?ref=favorite"
    }
    var j = httpUrl + e;
    var g = /msie ([\d\.]+)/.test(window.navigator.userAgent.toLowerCase()) && parseInt(/msie ([\d\.]+)/.exec(window.navigator.userAgent.toLowerCase())[1]) <= 6;
    if (g) {
        j = httpUrl
    }
    try {
        if (document.all) {
            window.external.AddFavorite(j, favorite)
        } else {
            try {
                window.sidebar.addPanel(favorite, j, "")
            } catch (h) {
                alert("æŠ±æ­‰ï¼Œæ‚¨æ‰€ä½¿ç”¨çš„æµè§ˆå™¨æ— æ³•å®Œæˆæ­¤æ“ä½œã€‚\n\nåŠ å…¥æ”¶è—å¤±è´¥ï¼Œè¯·ä½¿ç”¨Ctrl+Dè¿›è¡Œæ·»åŠ ")
            }
        }
    } catch (h) {
        alert("æŠ±æ­‰ï¼Œæ‚¨æ‰€ä½¿ç”¨çš„æµè§ˆå™¨æ— æ³•å®Œæˆæ­¤æ“ä½œã€‚\n\nåŠ å…¥æ”¶è—å¤±è´¥ï¼Œè¯·ä½¿ç”¨Ctrl+Dè¿›è¡Œæ·»åŠ ")
    }
}
function writeHeaderContent() {
    var c = jQuery("#global_login");
    var d = window.loli || (window.loli = {});
    if (c.size() > 0) {
        if (c.attr("data-type") != null) {
            d.globalCheckLogin(function (h) {
                var a = d.app = d.app || {};
                var b = d.app.account = d.app.account || {};
                var g = d.app.user = d.app.user || {};
                if (h && h.result == 1) {
                    if (b.onloadUserInfo) {
                        b.onloadUserInfo(h)
                    }
                }
            });
            return
        }
    }
}
function bothSiteLogoutJsonp() {
    jQuery.getJSON(((typeof URLPrefix.passport != "undefined") ? URLPrefix.passport : "https://passport.yhd.com") + "/passport/logoutJsonp.do?timestamp=" + new Date().getTime() + "&callback=?", function (c) {
        if (c && c.code == "0") {
            var d = (typeof globalSyncCookieFlag != "undefined" && globalSyncCookieFlag == "1") ? 1 : 0;
            if (d) {
                jQuery.getJSON("https://passport.yihaodian.com.hk/passport/logoutJsonp.do?timestamp=" + new Date().getTime() + "&callback=?", function (a) {
                    if (a && a.code == "0") {
                        window.location.reload()
                    }
                });
                setTimeout(function () {
                    window.location.reload()
                }, 3000)
            } else {
                window.location.reload()
            }
        }
    })
}
function hightLightMenu() {
    if ($("#global_menu").size() < 1) {
        return
    }
    var q = (typeof defaultFirstLinkJSON != "undefined" && defaultFirstLinkJSON.url != "") ? defaultFirstLinkJSON : null;
    var n = $("#global_menu a");
    if (q) {
        var p = loli.util.removeUrlHttp(q.url);
        var l = false;
        n.each(function (b, c) {
            var a = $(c);
            if (loli.util.removeUrlHttp(a.attr("href")).indexOf(p) == 0) {
                l = true;
                a.addClass("light")
            } else {
                a.removeClass("light")
            }
        });
        if (!l) {
            var o = [];
            o.push("<li>");
            o.push("<a class='light' href='" + q.url + "' data-ref='" + (q.tracker ? q.tracker : "") + "' target='_blank'>" + q.name + "</a>");
            o.push("</li>");
            $("#global_menu").prepend(o.join(""))
        }
    } else {
        var k = window.location.href;
        if (k.indexOf("?") != -1) {
            k = k.substring(0, k.indexOf("?"))
        }
        var m = /^([https:]*\/\/[\.\w]*\.yhd\.com.*)\/[0-9]+\/?$/;
        if (m.test(k)) {
            k = k.replace(m, "$1")
        }
        var j = /^[https:]*\/\/www\.yhd\.com[\/0-9]*/;
        if (j.test(k)) {
            $("#global_menu li:first a").addClass("light")
        } else {
            var r = -1;
            k = loli.util.removeUrlHttp(k);
            n.each(function (b, c) {
                var a = $(c);
                if (loli.util.removeUrlHttp(a.attr("href")).indexOf(k) == 0) {
                    r = b;
                    return false
                }
            });
            if (r != -1) {
                n.each(function (b, c) {
                    var a = $(c);
                    if (r == b) {
                        a.addClass("light")
                    } else {
                        a.removeClass("light")
                    }
                })
            }
        }
    }
}
function initHeader() {
    try {
        writeHeaderContent()
    } catch (b) {
    }
}
function headNavFixed() {
    var c = $("#hdSearchForm");
    if (c.size() < 1 || window.isIndex == 1) {
        return
    }
    if ($(".hd_header").hasClass("hd_channel_header") || $(".hd_header").hasClass("hd_city_header")) {
        return
    }
    var d = 660;
    if ($("#headerNav").size() > 0) {
        d = $("#headerNav").offset().top
    }
    if (typeof isIndex != "undefined" && isIndex == 1) {
        if ($(".mod_seckill").length > 0) {
            d = $(".mod_seckill").offset().top
        }
    }
    $(window).scroll(function () {
        var a = $(this).scrollTop();
        if (a > d) {
            if (!c.hasClass("hd_search_fixed")) {
                $(".hd_search_tips_result").hide();
                $(".hd_head_search").css("z-index", "950");
                c.css("top", "-70px");
                c.addClass("hd_search_fixed");
                $(".hd_search_fixed").animate({top: 0}, 500)
            }
        } else {
            c.removeClass("hd_search_fixed");
            $(".hd_head_search").css("z-index", "501")
        }
    })
}
function searchHeadNavFixed() {
    if ($("#headerNav").size() < 0) {
        return
    }
    var b = $("#rankOpDiv").size() > 0 ? $("#rankOpDiv").offset().top : $("#headerNav").offset().top;
    $(window).scroll(function () {
        var a = $(this).scrollTop();
        if (a > b) {
            $(".hd_cm_wrap").addClass("hd_cm_fixed")
        } else {
            $(".hd_cm_wrap").removeClass("hd_cm_fixed")
        }
    })
}
var yhdToolKit = window.yhdToolKit = window.yhdToolKit || {};
yhdToolKit.getProductPicByDefaultPic = window.getProductPicByDefaultPic;
jQuery(document).ready(function () {
    initHeader();
    if (typeof isFixTopNav != "undefined" && isFixTopNav == true) {
        if (typeof headerType != "undefined" && headerType == "search_v1") {
            searchHeadNavFixed()
        } else {
            headNavFixed()
        }
    }
    hightLightMenu();
    jQuery("#footerServiceLinkId").lazyDom({
        load: false, flushPrice: false, indexLoad: true, callback: function () {
        }
    });
    $("#footerQRcode,#footerIcon,#footer").lazyImg()
});
(function (B) {
    var u = window.loli || (window.loli = {});
    var r = u.app = u.app || {};
    var z = r.account = r.account || {};
    var A = B.cookie("provinceId");
    var y = B.cookie("yihaodian_uid");
    var q = 1;
    var v = {0: "1", 1: "2", 2: "3", 3: "4", 4: "5", 5: "6"};
    var C = {0: "æ–°æ™‹", 1: "ç™½é“¶", 2: "é»„é‡‘", 3: "é“‚é‡‘", 4: "é’»çŸ³", 5: "1å·ä¹‹æ˜Ÿ"};
    var s = B("#global_login");
    if (!y || !A) {
        return
    }
    var D = function (e) {
        var c = w(e);
        s.find(".hd_user_privilege").html(c);
        var d = URLPrefix.central + "/homepage/ajaxUserBenefitInfo.do?callback=?";
        var a = function (i) {
            if (i && i.benefitList && i.benefitList.length > 0) {
                var j = i.benefitList;
                var g = [];
                for (var h = 0; h < j.length; h++) {
                    var f = j[h];
                    g.push('<a href="' + f.benefitUrl + '" target="_blank"><em class="hd_iconfont">' + f.benefitIcon + "</em><p>" + f.benefitName + "</p></a>")
                }
                B(".hd_privilege_tit em").html(j.length);
                B(".hd_privilege_list").html(g.join(""));
                B(".hd_privilege_tit").show();
                B(".hd_privilege_slide").show();
                require(["header"], function (k) {
                    k.privilegeSlide()
                })
            }
        };
        t();
        var b = {
            userId: y,
            currSiteId: (typeof currSiteId == "undefined") ? 1 : currSiteId,
            currSiteType: 1,
            provinceId: A
        };
        B.getJSON(d, b, function (h) {
            var f = h;
            if (f) {
                if (f.status == 1) {
                    var g = f.userInfo;
                    a(g)
                }
            }
        })
    };
    var E = function (a) {
        if (a != null && a != "") {
            a = a.replace(/\&/g, "&amp;");
            a = a.replace(/\</g, "&lt;");
            a = a.replace(/\>/g, "&gt;");
            a = a.replace(/\\/g, "&#92;");
            a = a.replace(/\'/g, "&#039;");
            a = a.replace(/\"/g, "&#034;")
        }
        return a
    };
    var w = function (a) {
        if (!a) {
            return ""
        }
        var c = a.memberGrade ? a.memberGrade : 0;
        if (q) {
            c = a.memberGradeV2 ? a.memberGradeV2 : 0
        }
        var b = u.util.removeUrlHttp(a.endUserPic);
        if (!b) {
            b = URLPrefix.statics + "/global/images/top/peopleicon_02.gif";
            if (a.endUserSex == 1) {
                b = URLPrefix.statics + "/global/images/top/peopleicon_01.gif"
            }
        }
        var d = E(a.uname) || "";
        s.find(".hd_login_name").html(d);
        s.find(".hd_vip").addClass("hd_vip" + v[c]).html(q ? C[c] : ("V" + c));
        var e = [];
        e.push("<a href='javascript:bothSiteLogoutJsonp();' class='hd_login_out'>é€€å‡ºç™»å½•</a>");
        e.push("<div class='clearfix'>");
        e.push('<a href="//home.yhd.com/myyhdindex/index.do" class="hd_avata_box">');
        e.push('<img src="' + b + '" alt="">');
        e.push("</a>");
        e.push('<div class="fl">');
        e.push('<a href="//home.yhd.com/myyhdindex/index.do" title="ç”¨æˆ·å" class="hd_login_name">' + d + "</a>");
        e.push('<a href="//vip.yhd.com/" target="_blank" class="hd_vip hd_vip' + v[c] + '">' + (q ? C[c] : ("V" + c)) + "</a>");
        e.push("</div>");
        e.push("</div>");
        e.push('<div class="hd_privilege_tit" style="display: none"><span>æˆ‘å¯å°Šäº«<em>0</em>é¡¹ç‰¹æƒ</span></div>');
        e.push('<div class="hd_privilege_wrap hd_privilege_slide"  style="display: none">');
        e.push('  <a href="javascript:;" class="prev_btn hd_iconfont">&#xe62f;</a>');
        e.push('<div class="hd_privilege clearfix">');
        e.push('<div class="hd_privilege_list">');
        e.push("</div>");
        e.push("</div>");
        e.push('<a href="javascript:;" class="next_btn hd_iconfont">&#xe62b;</a>');
        e.push("</div>");
        return e.join("")
    };
    var F = function (a) {
        if (!a || !a.isLoginRecently) {
            return ""
        }
    };
    var t = function () {
        var a = null;
        s.hover(function () {
            if (a != null) {
                clearTimeout(a)
            }
            a = setTimeout(function () {
                s.addClass("hd_login_hover")
            }, 200)
        }, function () {
            if (a != null) {
                clearTimeout(a)
            }
            a = setTimeout(function () {
                s.removeClass("hd_login_hover")
            }, 200)
        });
        s.show();
        B("#global_unlogin").hide();
        B("#global_recentlogin").hide()
    };
    var x = function () {
        var a = B("#global_recentlogin");
        var b = null;
        a.hover(function () {
            if (b != null) {
                clearTimeout(b)
            }
            b = setTimeout(function () {
                a.addClass("hd_login_hover")
            }, 200)
        }, function () {
            if (b != null) {
                clearTimeout(b)
            }
            b = setTimeout(function () {
                a.removeClass("hd_login_hover")
            }, 200)
        });
        a.show();
        B("#global_unlogin").hide();
        B("#global_login").hide()
    };
    z.onloadUserInfo = function (b) {
        if (b) {
            if (b.result == 1) {
                D(b)
            } else {
                if (b.isLoginRecently == 1) {
                    var c = B("#global_recentlogin");
                    if (c.size() > 0) {
                        var a = F(b);
                        c.html(a);
                        x()
                    }
                }
            }
        }
    };
    z.showUserInfo = function () {
        if (s.size() > 0) {
            u.globalCheckLogin(z.onloadUserInfo)
        }
    };
    z.showUserInfo()
})(jQuery);
var YHDPROVINCE = {};
YHDPROVINCE.getCurentDomain = function () {
    return URLPrefix.central
};
YHDPROVINCE.getOppositeDomain = function () {
    return URLPrefix.central
};
function setAddressCity(k, i, m) {
    var l = $.cookie("cityId");
    var h = {};
    var n = null;
    var j = 0;
    if (m) {
        n = i;
        j = m.cityId
    } else {
        if (typeof i == "object") {
            n = i.targetUrl;
            j = i.cityId
        } else {
            if (i) {
                n = i
            }
        }
    }
    if (n) {
        h.targetUrl = n
    }
    h.oldCityId = l;
    h.cityId = j;
    loli.cookie.setYhdLocation(k + "_" + j + "_0_0", function () {
        if (window.isIndex && window.isIndex === 1) {
            window.location = "//www.yhd.com/" + k + "/?cityId=" + j
        } else {
            window.location.reload()
        }
    })
};var provinceCity = {
    capitalCity: function () {
        return {
            2: 2817,
            1: 2816,
            3: 51035,
            4: 48131,
            5: 142,
            6: 303,
            7: 412,
            8: 560,
            9: 639,
            10: 698,
            11: 799,
            12: 904,
            13: 1000,
            14: 1116,
            15: 1213,
            16: 1303,
            17: 1381,
            18: 1482,
            19: 1601,
            20: 1715,
            21: 1827,
            22: 1930,
            23: 2121,
            24: 2144,
            25: 2235,
            26: 2951,
            27: 2376,
            28: 2487,
            29: 2580,
            30: 2628,
            31: 2652,
            32: 2768,
            84: 1310,
            52993: 52994
        }
    }, citySelect: function () {
        var L = $(".hd_city_list ul"), D, S = $(".hd_indxProvce"), V = $(".hd_city_search"), O = V.find(".hd_iconfont"),
            M = $(".hd_city_select"), Q = $(".hd_topbar_city"), H = $(".hd_citys_close"), K = $(".hd_city_suggest"),
            F = false, G = false, ab = $("#currProvince");
        var U = [];
        var I = [];
        L.scrollTop(0);
        function R() {
            if (U.length > 0 && D && D.length > 0) {
                return
            }
            for (var a = 0; a < D.length; a++) {
                U.push(D.eq(a).position().top)
            }
        }

        $(".hd_city_select").hide().removeClass("hd_city_opacity");
        $(".hd_city_initial").on("click", "a", function () {
            var a = $(this).index();
            if (U[a]) {
                L.stop().animate({scrollTop: U[a] - 10})
            }
        });
        function T(a) {
            var b = /^[A-Za-z]+$/;
            if (b.test(a)) {
                return true
            }
            return false
        }

        function B(c) {
            var d = [];
            var b = [];
            for (var a = 0; a < I.length; a++) {
                if (d.length > 5) {
                    break
                }
                var f = I[a];
                if (f.suggestName.indexOf(c) > -1) {
                    d.push('<a href="javascipt:;" data-cityId="' + f.cityId + '" data-provinceId="' + f.provinceId + '">' + f.cityName + "</a>")
                } else {
                    if ((b.length + d.length) < 6) {
                        if (f.cityPinyin.indexOf(c) > -1) {
                            b.push('<a href="javascipt:;" data-cityId="' + f.cityId + '" data-provinceId="' + f.provinceId + '">' + f.cityName + "</a>")
                        }
                    }
                }
            }
            if (d.length < 6) {
                var e = 6 - d.length;
                if (d.length + b.length >= 6) {
                    b.length = e
                }
                d = d.concat(b)
            }
            return d.join("")
        }

        function J(a) {
            var b = [];
            for (var d = 0; d < I.length; d++) {
                if (b.length > 5) {
                    break
                }
                var c = I[d];
                if (c.cityName.indexOf(a) > -1) {
                    b.push('<a href="javascipt:;" data-cityId="' + c.cityId + '" data-provinceId="' + c.provinceId + '">' + c.cityName + "</a>")
                }
            }
            return b.join("")
        }

        var P = function (a) {
            if (I && I.length < 1) {
                return
            }
            var b;
            if (T(a)) {
                b = B(a.toLocaleLowerCase())
            } else {
                var c = /[\u4e00-\u9fa5]{1,}/g;
                var d = a.match(c);
                if (d.length > 0) {
                    b = J(d[0])
                } else {
                    b = J(d)
                }
            }
            K.html(b)
        };
        V.on("keydown", "input", function () {
            if (this.value.length > 0) {
                P(this.value.toLowerCase())
            }
            K.show();
            H.show();
            O.hide();
            G = true
        });
        V.on("click", ".hd_citys_close", function () {
            K.hide();
            H.hide();
            O.show();
            V.find("input").val("");
            G = false
        });
        V.on("keyup", "input", function () {
            iptVal = this.value;
            if (iptVal.length > 0) {
                P(iptVal.toLowerCase())
            }
            if (iptVal == "") {
                K.hide();
                H.hide();
                O.show()
            }
        });
        S.on("click", function (a) {
            $(this).addClass("hd_cur");
            M.show();
            F = true;
            R();
            a.stopPropagation()
        });
        S.on("click", ".hd_city_close", function (a) {
            W();
            a.stopPropagation()
        });
        $(document).click(function (a) {
            if (!F) {
                return
            }
            var b = $(a.target);
            if (b.parents(".hd_city_select").length == 0 || b.is(".hd_city_close")) {
                W()
            }
        });
        $(".hd_city_select").click(function (a) {
            if (!G) {
                return
            }
            var b = $(a.target);
            if (!b.is(".hd_city_suggest")) {
                K.hide();
                V.find("input").focus();
                G = false
            }
        });
        function aa(a) {
            var b = $(a);
            b.on("click", "a", function () {
                var d = $(this).attr("data-provinceId");
                var c = $(this).attr("data-cityId");
                setAddressCity(d, {cityId: c});
                W();
                var e = $(this).text();
                ab.find("em").text(e);
                return false
            })
        }

        var C = [];

        function E(i) {
            var g = [];
            var k = M.attr("data-hot");
            var f = [];
            var b;
            if (k) {
                var h = k.split("&&");
                for (var c = 0; c < h.length; c++) {
                    var j = h[c].split(",");
                    if (j.length > 2) {
                        f.push('<a href="javascipt:;" data-cityId="' + j[0] + '" data-provinceId="' + j[2] + '">' + j[1] + "</a>")
                    }
                }
            }
            $(".hd_hotcity_list").html(f.join(""));
            var a = i.objCitys;
            var e = [];
            if (!i) {
                return
            }
            for (var l in a) {
                e.push('<a href="javascript:;">' + l + "</a>");
                var m = '<li class="clearfix"> <div class="hd_city_innitial_tit">' + l + '</div><div class="hd_city">';
                for (var d = 0; d < a[l].length; d++) {
                    b = a[l][d];
                    if (typeof b.cityId == "undefined") {
                        continue
                    }
                    if (k && k.indexOf(b.cityName) > -1) {
                        C.push(b)
                    } else {
                        I.push(b)
                    }
                    m = m + '<a href="javascipt:;" data-cityId="' + b.cityId + '" data-provinceId="' + b.provinceId + '">' + b.cityName + "</a>"
                }
                m = m + "</div></li>";
                g.push(m)
            }
            I = C.concat(I);
            $(".hd_city_initial").html(e.join(""));
            $(".hd_city_list ul").html(g.join(""));
            D = $(".hd_city_list li")
        }

        function X() {
            var a = "//www.yhd.com/homepage/getAllCity.do";
            $.ajax({
                type: "GET",
                url: a,
                timeout: 2000,
                dataType: "jsonp",
                jsonpCallback: "jsonp_getAllCity" + new Date().getMonth(),
                cache: true,
                success: function (d) {
                    if (d) {
                        try {
                            if (window.sessionStorage && window.sessionStorage.setItem) {
                                var c = JSON.stringify(d);
                                window.sessionStorage.setItem("_allCityData", c)
                            }
                        } catch (b) {
                        }
                        E(d)
                    }
                },
                error: function () {
                    E({})
                }
            })
        }

        function W() {
            S.removeClass("hd_cur");
            M.hide();
            K.hide();
            F = false
        }

        try {
            if (window.sessionStorage && window.sessionStorage.getItem) {
                var N = window.sessionStorage.getItem("_allCityData");
                var Y = JSON.parse(N);
                if (Y) {
                    E(Y)
                } else {
                    X()
                }
            } else {
                X()
            }
        } catch (Z) {
            X()
        }
        aa(".hd_hotcity_list");
        aa(".hd_city_list");
        aa(".hd_city_suggest")
    }, initProvince: function () {
        function t(a) {
            var c = {cityId: a};
            var b = "//www.yhd.com/homepage/getCityById.do";
            $.ajax({
                type: "GET",
                url: b,
                data: c,
                dataType: "jsonp",
                jsonpCallback: "jsonp_getCityById" + new Date().getMonth(),
                cache: true,
                success: function (e) {
                    if (e && e.city) {
                        $("#currProvince").find("em").text(e.city.cityName);
                        var f = jQuery.cookie("yhd_location");
                        var g = jQuery.cookie("provinceId");
                        var d = jQuery.cookie("cityId");
                        if (d != e.city.cityId || g != e.city.provinceId) {
                            d = e.city.cityId;
                            g = e.city.provinceId;
                            $.cookie("cityId", d, {domain: "yhd.com", path: "/", expires: 800});
                            $.cookie("provinceId", g, {domain: "yhd.com", path: "/", expires: 800})
                        }
                        if (f == undefined) {
                            f = e.city.provinceId + "_" + e.city.cityId + "_" + (e.city.areaId ? e.city.areaId : "0") + "_" + (e.city.townId ? e.city.townId : "0");
                            $.cookie("yhd_location", f, {domain: "yhd.com", path: "/", expires: 800})
                        } else {
                            if (g > 4 && (f.split("_")[2] == 0 || typeof f.split("_")[2] == "undefined")) {
                                f = e.city.provinceId + "_" + e.city.cityId + "_" + (e.city.areaId ? e.city.areaId : "0") + "_" + (e.city.townId ? e.city.townId : "0");
                                $.cookie("yhd_location", f, {domain: "yhd.com", path: "/", expires: 800})
                            } else {
                                if (g < 5 && (f.split("_")[2] == 0 || typeof f.split("_")[2] == "undefined")) {
                                    f = e.city.provinceId + "_" + e.city.cityId + "_" + (e.city.areaId ? e.city.areaId : "0") + "_" + (e.city.townId ? e.city.townId : "0");
                                    $.cookie("yhd_location", f, {domain: "yhd.com", path: "/", expires: 800})
                                }
                            }
                        }
                    }
                },
                error: function () {
                }
            })
        }

        var o = jQuery.cookie("provinceId");
        if (o >= 5 && o <= 32) {
            var p = jQuery.cookie("cityId");
            if (!p || p == "0") {
                var s = provinceCity.capitalCity();
                p = s[o];
                $.cookie("cityId", p, {domain: "yhd.com", path: "/", expires: 800})
            }
            t(p)
        } else {
            if (o > 0 && o < 5) {
                t(o)
            } else {
                loli.cookie.setYhdLocation();
                t(2)
            }
        }
        var r = document.domain;
        if (loli.util.url && (r == "www.yhd.com" || r == "1mall.yhd.com")) {
            var n = window.location.href;
            var v = loli.util.url.getParams(n);
            if (v && (v.cityId || v.cityId === "0")) {
                var q = v.cityId;
                var w = 2;
                var u = jQuery.cookie("yhd_location");
                if (typeof(u) != "undefined" && u) {
                    var m = u.split("_");
                    w = m[1]
                }
                if (q != w) {
                    w = jQuery.cookie("cityId");
                    if (!w || w == "0") {
                        w = 2
                    }
                    if (q != w) {
                        var x = loli.util.url.deleteParams(n, ["cityId"]);
                        x = loli.util.url.appendParams(x, {cityId: w});
                        if (w == 2) {
                            x = loli.util.url.appendParams(x, {forceId: 2})
                        }
                        window.location.href = x
                    }
                }
            }
        }
        provinceCity.citySelect()
    }
};
jQuery(document).ready(function () {
    provinceCity.initProvince()
});
define("header_miniCart", function () {
    var b = {};
    var c = URLPrefix.cartDomain || "//cart.yhd.com";
    var d = $("#in_cart_num");
    var a = function () {
        var f = jQuery.cookie("cart_num");
        var e = (f && !isNaN(f)) ? parseInt(f) : 0;
        if (e > 0) {
            d.text(e > 999 ? "999+" : e);
            d.show();
            $("#prismCartNum").removeClass("none").find("u").html(e)
        } else {
            jQuery.ajax({
                type: "GET",
                url: c + "/cart/opt/getCartCount.do",
                timeout: 5000,
                dataType: "jsonp",
                jsonpCallback: "jsonp" + new Date().getTime(),
                success: function (g) {
                    if (g && g.code == "00000000" && g.data > 0) {
                        d.text(g.data > 999 ? "999+" : g.data);
                        d.show();
                        $("#prismCartNum").removeClass("none").find("u").html(g.data)
                    } else {
                        d.hide();
                        $("#prismCartNum").addClass("none").find("u").empty()
                    }
                },
                error: function (g, i, h) {
                    d.hide();
                    $("#prismCartNum").addClass("none").find("u").empty()
                }
            })
        }
    };
    b.initCart = function () {
        a()
    };
    return b
});
var yhdLib = window.yhdLib || (window.yhdLib = {});
if (!yhdLib.hasOwnProperty("popwin")) {
    yhdLib.popwin = function (param) {
        var arg = param, tcBox = ".popGeneral", sFun = arg.fun ? arg.fun : [],
            cTxt = arg.popcontentstr ? arg.popcontentstr : "", popEvent = arg.popevent ? arg.popevent : "click",
            autoClose = arg.autoclosetime;
        var fixed = typeof(arg.fix) == "undefined" || arg.fix ? true : false;
        var ieLower = /msie ([\d\.]+)/.test(window.navigator.userAgent.toLowerCase()) && parseInt(/msie ([\d\.]+)/.exec(window.navigator.userAgent.toLowerCase())[1]) <= 6;
        if (arg.clickid) {
            $(arg.clickid).bind(popEvent, function () {
                if ($(".popGeneral").length == 0) {
                    popMask()
                }
            })
        } else {
            if ($(".popGeneral").length == 0) {
                popMask()
            }
        }
        function popMask() {
            var dwidth = "100%", dheight = $(document).height();
            if (ieLower) {
                $("select:visible", ".delivery").each(function (i) {
                    $(this).addClass("selectSjl").hide()
                })
            }
            var popBOX = !fixed ? '<div class="popGeneral" style="position:absolute;" ' : '<div class="popGeneral" ';
            if (arg.poptitle) {
                popBOX += '><div class="top_tcgeneral"><h4>' + arg.poptitle + '</h4><span class="close_tcg">&times;</span></div></div>'
            } else {
                popBOX += "></div>"
            }
            if (arg.mask || arg.mask == null) {
                $('<div class="mask_tcdiv"></div>').appendTo($("body")).css({
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 100001,
                    width: dwidth + "",
                    height: dheight + "px",
                    background: "#000",
                    opacity: 0.4
                })
            }
            $(popBOX).appendTo($("body"));
            loli.scroll(function () {
                $(".mask_tcdiv").height($(document).height())
            });
            if (arg.popwidth) {
                $(".popGeneral").width(arg.popwidth)
            }
            if (arg.popheight) {
                $(".popGeneral").height(arg.popheight)
            }
            var apTxt = cTxt ? $(cTxt) : $(arg.popcontent).clone();
            apTxt.appendTo($(tcBox)).show();
            popPosition();
            for (var funI = sFun.length - 1;
                 funI >= 0; funI--) {
                eval(sFun[funI] + "()")
            }
            return false
        }

        function popPosition() {
            var popwinTop = 0;
            $(window).resize(function () {
                var width = $(tcBox).width(), height = $(tcBox).height() / 2, windWidth = $(window).width(),
                    pLeft = (windWidth - width) / 2;
                $(tcBox).css({left: pLeft, top: "50%", bottom: "auto", marginTop: "-" + height + "px"});
                popwinTop = $(window).height() / 2 - height
            }).trigger("resize");
            if (ieLower && fixed) {
                $(window).scroll(function () {
                    $(tcBox).css({top: popwinTop + $(window).scrollTop() + "px", marginTop: 0})
                }).trigger("scroll")
            }
            $(".close_tcg").click(function () {
                closeTc()
            });
            if (autoClose) {
                setTimeout(function () {
                    closeTc()
                }, autoClose)
            }
            if (arg.outareaclose) {
                $(".mask_tcdiv").click(function () {
                    closeTc()
                })
            }
            $(window).keydown(function (event) {
                if (event.keyCode == 27) {
                    closeTc()
                }
            });
            return false
        }

        function closeTc() {
            $(".popGeneral").remove();
            $(".mask_tcdiv").remove();
            if (ieLower) {
                $("select.selectSjl").each(function () {
                    $(this).removeClass("selectSjl").show()
                })
            }
        }

        return false
    }
}
if (!yhdLib.hasOwnProperty("popclose")) {
    yhdLib.popclose = function () {
        var b = /msie ([\d\.]+)/.test(window.navigator.userAgent.toLowerCase()) && parseInt(/msie ([\d\.]+)/.exec(window.navigator.userAgent.toLowerCase())[1]) <= 6;
        if (b) {
            $("select.selectSjl").each(function () {
                $(this).removeClass("selectSjl").show()
            })
        }
        $(".popGeneral,.mask_tcdiv").remove()
    }
}
if (!yhdLib.hasOwnProperty("popwinreload")) {
    yhdLib.popwinreload = function () {
        if ($("body > .popGeneral").length) {
            $(window).trigger("resize")
        }
    }
}
if (!yhdLib.hasOwnProperty("ratebox")) {
    yhdLib.ratebox = function (rateboxArgus) {
        var rateArg = rateboxArgus, rateObj = document.getElementById(rateArg.id), rateDg = rateArg.ratedegree;
        if (rateArg.autorate) {
            var rtim = rateArg.ratetime ? rateArg.ratetime : 15, step = rateArg.step ? rateArg.step : 20;
            if (rateDg >= 0) {
                setInterval(function () {
                    rate(rateObj, (rateDg += step) >= 360 ? rateDg = 0 : rateDg);
                    return false
                }, rtim)
            } else {
                if (rateDg < 0) {
                    setInterval(function () {
                        rate(rateObj, (rateDg -= step) <= 0 ? rateDg = 360 : rateDg);
                        return false
                    }, rtim)
                }
            }
        } else {
            rate(rateObj, rateDg)
        }
        function rate(obj, degree) {
            var ST = obj.style;
            if (document.all) {
                var deg = degree * Math.PI / 180, M11 = Math.cos(deg), M12 = -Math.sin(deg), M21 = Math.sin(deg),
                    M22 = Math.cos(deg);
                obj.fw = obj.fw || obj.offsetWidth / 2;
                obj.fh = obj.fh || obj.offsetHeight / 2;
                var adr = (90 - degree % 90) * Math.PI / 180, adp = Math.sin(adr) + Math.cos(adr);
                with (ST) {
                    filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + M11 + ",M12=" + M12 + ",M21=" + M21 + ",M22=" + M22 + ",SizingMethod='auto expand');";
                    top = obj.fh * (1 - adp) + "px";
                    left = obj.fw * (1 - adp) + "px"
                }
            } else {
                var rotate = "rotate(" + degree + "deg)";
                with (ST) {
                    MozTransform = rotate;
                    WebkitTransform = rotate;
                    OTransform = rotate;
                    Transform = rotate
                }
            }
            return false
        }

        return false
    }
}
if (!yhdLib.hasOwnProperty("alert")) {
    yhdLib.alert = function (g, h, l, j, i) {
        var k = '<div class="msgBxShow">';
        k += '<i class="icon_tips icon_warning"></i><span id="error_popwin">' + g + "</span>";
        k += '</div><p class="pop_btn_box"><button id="close_tcg" class="close_tcg">ç¡®å®š</button></p>';
        yhdLib.popwin({popwidth: l, popheight: j, popcontent: k, popevent: i, outareaclose: true});
        if (h) {
            jQuery("#close_tcg").click(function () {
                h()
            })
        }
    }
}
jQuery.yhdtool = yhdLib;
var loginFrameClientFunction;
var loginRegisterFrameType;
function passportLoginFrame(t, w, p, r) {
    loginFrameClientFunction = p;
    loginRegisterFrameType = r;
    var x = encodeURIComponent(returnUrl ? returnUrl : window.location.href);
    var n = window.location.protocol;
    var m = window.location.host;
    var q = n + "//" + m;
    if (w) {
        q = q + w
    }
    encodeCurrentDomain = encodeURIComponent(q);
    var o = '<iframe frameBorder=0 scrolling="no" style="border: 0px none;background:url(//d6.yihaodianimg.com/N01/M02/1C/03/CgQCrlD3yRSAFpX-AAAJ84RedYA15700.jpg) no-repeat center;" width="450" height="345" id="loginIframe"></iframe>';
    var v = "ç”¨æˆ·ç™»å½•";
    yhdLib.popwin({poptitle: v, popcontentstr: o});
    var s = t + "/publicPassport/loginFrame.do?fromDomain=" + encodeCurrentDomain + "&returnUrl=" + x;
    var u = $("#loginIframe", document.body);
    setTimeout(function () {
        u.attr("src", s);
        u.focus()
    }, 0)
}
function passportLoginFrameCallback(f, j) {
    yhdLib.popclose();
    if (j) {
        var g = decodeURIComponent(j);
        window.location.href = g
    } else {
        if (loginRegisterFrameType == 2 && f == 10) {
            var h = "1å·åº—";
            var i = '<div class="regLROk" style="position:relative; width:320px; text-align:center; z-index:1;"><div class="inner" style="padding:35px 0; background-color:#fff;"><p style="font-size:14px; font-weight:bold; color:#333; line-height:35px;">æ¬¢è¿Žæ‚¨æˆä¸º' + h + 'ä¼šå‘˜ï¼Œç¥æ‚¨è´­ç‰©æ„‰å¿«ï¼</p><span style="color:#999;">3såŽè‡ªåŠ¨å…³é—­</span></div><div class="regLROkMask" style="position:absolute; width:340px; height:140px; top:-10px; left:-10px; background-color:#000; opacity:0.5; filter:alpha(opacity=50); z-index:-1;"></div></div>';
            yhdLib.popwin({poptitle: "", popcontentstr: i});
            setTimeout(function () {
                loginFrameClientFunction(f)
            }, 3000)
        } else {
            loginFrameClientFunction(f)
        }
    }
};var returnUrl = document.location.href;
var yhdPublicLogin = yhdPublicLogin || {};
var URLPrefix_passport = URLPrefix.passport;
yhdPublicLogin.checkLogin = function (c) {
    if (!c) {
        if (yhdPublicLogin.getCookie("ut")) {
            return true
        } else {
            return false
        }
    }
    var d = "https://passport.yhd.com/publicPassport/isLogin.do?callback=?";
    jQuery.ajax({
        type: "get", url: d, dataType: "json", success: function (a) {
            if (a.result == "1") {
                c(true);
                return
            }
            c(false)
        }, error: function () {
            c(false)
        }
    })
};
yhdPublicLogin.getCookie = function (h) {
    var g = document.cookie.split(";");
    for (var e = 0; e < g.length; e++) {
        var f = g[e].split("=");
        if (f[0].replace(/(^\s*)|(\s*$)/g, "") == h) {
            return f[1]
        }
    }
    return ""
};
yhdPublicLogin.loadCssAndJs = function (f, h) {
    var g = "";
    var e = 0;
    if (typeof currVersionNum != "undefined") {
        e = currVersionNum
    }
    if (h == "js") {
        g = document.createElement("script");
        g.setAttribute("type", "text/javascript");
        g.setAttribute("charset", "UTF-8");
        g.setAttribute("src", f + "?" + e)
    } else {
        if (h == "css") {
            g = document.createElement("link");
            g.setAttribute("rel", "stylesheet");
            g.setAttribute("type", "text/css");
            g.setAttribute("href", f + "?" + e)
        }
    }
    if (typeof g != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(g)
    }
};
yhdPublicLogin.showLoginDiv = function (g, h, e) {
    function f() {
        if (g) {
            var d = "";
            if (g.toLowerCase().indexOf("http") < 0) {
                var b = window.location.protocol;
                var l = window.location.host;
                var a = b + "//" + l;
                d = a
            }
            var k = d + g;
            returnUrl = k
        }
        try {
            passportLoginFrame(URLPrefix_passport, null, function (j) {
                try {
                    if (returnUrl) {
                        window.location.href = returnUrl
                    } else {
                        window.location.reload(true)
                    }
                } catch (i) {
                }
            }, e)
        } catch (c) {
        }
    }

    if (h) {
        yhdPublicLogin.checkLogin(function (a) {
            if (!a) {
                f()
            }
        })
    } else {
        f()
    }
};
yhdPublicLogin.showLoginDivNone = function (i, h, k, l, j) {
    try {
        if (h) {
            yhdPublicLogin.checkLogin(function (a) {
                if (!a) {
                    passportLoginFrame(i, k, l, j)
                }
            })
        } else {
            passportLoginFrame(i, k, l, j)
        }
    } catch (e) {
    }
};
yhdPublicLogin.showTopLoginInfo = function () {
    try {
        writeHeaderContent()
    } catch (b) {
    }
};
jQuery(document).ready(function () {
    yhdPublicLogin.loadCssAndJs("//passport.yhd.com/front-passport/passport/js/login_frame_client.js", "js")
});
define("common_cart", function () {
    var m = {};
    var k = URLPrefix.cartDomain || "//cart.yhd.com";
    var q = $("#miniCart");
    var l = $("#in_cart_num");
    var n = function () {
    };
    var o = function (a) {
    };
    var s = function (c, a, b) {
    };
    var p = function (a) {
        var b = k + "/cart/opt/add.do";
        var c = {
            pcount: a.pcount,
            pid: a.pid,
            ptype: a.ptype,
            sku: a.sku || "",
            did: a.did || "",
            gids: a.gids || "",
            zids: a.zids || ""
        };
        jQuery.ajax({
            url: b,
            data: c,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "jsonp" + new Date().getTime(),
            cache: false,
            timeout: 5000,
            success: function (e) {
                if (e && e.code) {
                    var d;
                    switch (e.code) {
                        case"00000000":
                            d = "æ“ä½œæˆåŠŸ";
                            break;
                        case"60000001":
                            d = "æ— æ•ˆå•†å“";
                            break;
                        case"60000002":
                            d = "æœªé€‰ä¸­å•†å“";
                            break;
                        case"60000003":
                            d = "å•†å“æ— åº“å­˜";
                            break;
                        case"60000004":
                            d = "æ— æ»¡è¶³çš„è™šæ‹Ÿå¥—è£…è§„åˆ™";
                            break;
                        case"60000005":
                            d = "æ“ä½œå¤ªé¢‘ç¹";
                            break;
                        case"99999999":
                            d = "ç³»ç»Ÿå¼‚å¸¸";
                            break
                    }
                }
                d = d || "ç³»ç»Ÿå¼‚å¸¸";
                t(e, d);
                if (e.code == "00000000") {
                    r();
                    q.data("cart-item-loaded", 0);
                    n()
                } else {
                    o(d)
                }
            },
            error: function (f, d, e) {
                t("", "åŠ å…¥è´­ç‰©è½¦å¤±è´¥");
                s(f, d, e)
            }
        })
    };
    var t = function (d, f) {
        var c = 0;
        var a = 0;
        var e = function () {
            var i = $("#addCartPopWin");
            var h = $("a.hd_show_pre", i);
            var B = $("a.hd_show_next", i);
            var g = i.find("div.hd_recommend_list ul");
            var z = i.find("div.hd_recommend_list").width() + 15;
            var C = $("div.hd_recommend_list li", i).size();
            var D = 4;
            var j = (C % D == 0) ? Math.floor(C / D) : Math.floor(C / D) + 1;
            var A = 1;
            if (j > 1) {
                B.show();
                h.click(function () {
                    if (A > 1) {
                        g.animate({left: "-" + (A - 2) * z + "px"}, function () {
                            A--;
                            if (A < j) {
                                B.show()
                            }
                            if (A == 1) {
                                h.hide()
                            }
                        })
                    } else {
                        h.hide();
                        B.show()
                    }
                });
                B.click(function () {
                    if (A < j) {
                        g.animate({left: "-" + (A) * z + "px"}, function () {
                            A++;
                            if (A > 1) {
                                h.show()
                            }
                            if (A == j) {
                                B.hide()
                            }
                        })
                    } else {
                        h.show();
                        B.hide()
                    }
                })
            }
        };
        if (c) {
            clearTimeout(c)
        }
        if (a) {
            return
        }
        var b = [];
        b.push("<div id='addCartPopWin' class='hd_cart_pop' data-tpa='AI_REAL_TIME_LANDINGPAGE'>");
        b.push("<div class='hd_pop_content'>");
        b.push("<span class='hd_colse_btn' onclick='javascript:yhdLib.popclose();'></span>");
        if (d && d.code == "00000000") {
            b.push("<p class='hd_pop_tips'><i></i>å·²æˆåŠŸåŠ å…¥è´­ç‰©è½¦</p>");
            b.push("<div class='hd_pop_btn'>");
            b.push("<a href='javascript:yhdLib.popclose();' class='hd_btn_l' data-ref='product_popup_jxgw'>ç»§ç»­è´­ç‰©</a>");
            b.push("<a href='//cart.yhd.com/cart/cart.do?action=view' class='hd_btn_r' data-ref='product_popup'>æŸ¥çœ‹è´­ç‰©è½¦</a>");
            b.push("</div>")
        } else {
            b.push("<p class='hd_pop_tips'><i class='hd_error_icon'></i>" + f + "</p>");
            b.push("<div class='hd_error_tips'>");
            b.push(d.msg);
            b.push("</div>")
        }
        b.push("</div>");
        b.push("</div>");
        yhdLib.popwin({popcontentstr: b.join("")});
        a = 1;
        e()
    };
    var r = function () {
        jQuery.ajax({
            type: "GET",
            url: k + "/cart/opt/getCartCount.do",
            timeout: 5000,
            dataType: "jsonp",
            jsonpCallback: "jsonp" + new Date().getTime(),
            success: function (a) {
                if (a && a.code == "00000000" && a.data > 0) {
                    l.text(a.data > 999 ? "999+" : a.data);
                    l.show();
                    if ($("#prismCartNum").length > 0) {
                        $("#prismCartNum").removeClass("none").find("u").html(a.data)
                    }
                } else {
                    l.hide();
                    if ($("#prismCartNum").length > 0) {
                        $("#prismCartNum").addClass("none").find("u").empty()
                    }
                }
            }
        })
    };
    m.addToCart = function (b, a) {
        if (typeof a != "undefined" && a) {
            if (a.addToCartSuccess) {
                n = a.addToCartSuccess
            }
            if (a.addToCartError) {
                o = a.addToCartError
            }
            if (a.addToCartServerError) {
                s = a.addToCartServerError
            }
        }
        p(b)
    };
    return m
});
(function (n) {
    function t() {
        var b = window.loli || (window.loli = {});
        var a = b.prism = b.prism || {};
        a.functions = a.functions || {init: r, showIm: s}
    }

    function s(a) {
        var b = n("#prismIm");
        if (a && a.length > 0) {
            b.show().find("a").attr("href", a)
        } else {
            b.hide()
        }
    }

    function r() {
        if (!(window.globalPrismFlag && globalPrismFlag == "1")) {
            return
        }
        if (loli.util.isIE() && loli.util.isIE() <= 6) {
            return
        }
        n("body").append(u());
        x();
        o();
        s(false)
    }

    function m() {
        return [{
            id: "prismTopAdv",
            text: "å¤§ä¿ƒå¹¿å‘Š",
            type: "adv",
            iconfont: "",
            position: "top",
            disable: false,
            expand: false,
            expandCss: "prism_ad_show",
            tpc: 1,
            url: ""
        }, {
            id: "prismPerson",
            text: "ä¸ªäººä¸­å¿ƒ",
            type: "icon",
            iconfont: "&#xe616;",
            position: "center",
            disable: false,
            expand: false,
            expandCss: "prism_cart_show",
            tpc: 10,
            url: globalPrismMemberLink
        }, {
            id: "prismCart",
            text: "",
            type: "cart",
            iconfont: "&#xe618;",
            position: "center",
            disable: false,
            expand: false,
            expandCss: "prism_cart_show",
            tpc: 10,
            url: globalPrismCartLink
        }, {
            id: "prismCoupon",
            text: "æŠµç”¨åˆ¸",
            type: "icon",
            iconfont: "&#xe628;",
            position: "center",
            disable: false,
            expand: false,
            expandCss: "prism_coupon_show",
            tpc: 30,
            url: globalPrismCouponLink
        }, {
            id: "prismIm",
            text: "å’¨è¯¢å®¢æœ",
            type: "icon",
            iconfont: "&#xe63f;",
            position: "bottom",
            disable: false,
            expand: false,
            expandCss: "",
            tpc: 50
        }, {
            id: "prismFeedback",
            text: "ç”¨æˆ·åé¦ˆ",
            type: "icon",
            iconfont: "&#xe615;",
            position: "bottom",
            disable: false,
            expand: false,
            expandCss: "",
            tpc: 50,
            url: globalPrismFeedbackURL
        }, {
            id: "prismQRCode",
            text: "äºŒç»´ç ",
            type: "icon",
            iconfont: "&#xe610;",
            position: "bottom",
            disable: false,
            expand: false,
            expandCss: "",
            tpc: 60
        }, {
            id: "prismBacktop",
            text: "è¿”å›žé¡¶éƒ¨",
            type: "icon",
            iconfont: "&#xe62d;",
            position: "bottom",
            disable: false,
            expand: false,
            expandCss: "",
            tpc: 70
        }]
    }

    function q(b) {
        var a = {};
        for (var c = 0; c < b.length; c++) {
            a[b[c].id] = b[c]
        }
        return a
    }

    function p() {
        var a = typeof customPrismConfig == "undefined" ? [] : customPrismConfig;
        return n.extend(q(m()), q(a))
    }

    function u() {
        var a = p();
        var b = ['<div id="prismWrap" class="yhd_prism_wrap">'];
        b.push('<div class="yhd_prism_nav">');
        b = b.concat(v("top", "prism_top_ad", a));
        b = b.concat(v("center", "prism_nav_center", a));
        b = b.concat(v("bottom", "prism_nav_btm", a));
        b.push("</div>");
        b.push("</div>");
        return b.join("")
    }

    function v(c, a, d) {
        var e = ['<div class="' + a + '">'];
        for (var b in d) {
            if (d.hasOwnProperty(b)) {
                var f = d[b];
                if (f.disable || f.position != c) {
                    continue
                }
                e.push(w(f))
            }
        }
        e.push("</div>");
        return e
    }

    function w(d) {
        var c = [];
        var e = d.url ? d.url : "javascript:;";
        var a = d.url ? 'target="_blank"' : "";
        if (d.type == "cart") {
            c.push('<div class="prism_nav_tab prism_cart_wrap" clstag="pageclick|keycount|lengjing_201709227|2" data-type="' + d.type + '" id="' + d.id + '">');
            c.push('<a class="prism_cart_tab" href="' + e + '" ' + a + ">");
            c.push('<em class="prism_iconfont">' + d.iconfont + "</em>");
            c.push('<div class="prism_cart_text">' + d.text + "</div>");
            c.push('<p id="prismCartNum" class="prism_cart_num none"><u></u></p>');
            c.push("</a>");
            c.push("</div>")
        } else {
            if (d.type == "icon") {
                var b;
                switch (d.id) {
                    case"prismCoupon":
                        b = "pageclick|keycount|lengjing_201709227|3";
                        break;
                    case"prismFeedback":
                        b = "pageclick|keycount|lengjing_201709227|5";
                        break;
                    case"prismQRCode":
                        b = "pageclick|keycount|lengjing_201709227|6";
                        break;
                    case"prismFavorite":
                        b = "pageclick|keycount|lengjing_201709227|4";
                        break;
                    case"prismBacktop":
                        b = "pageclick|keycount|lengjing_201709227|7";
                        break;
                    default:
                        b = ""
                }
                c.push('<div class="prism_nav_tab prism_icon_wrap" clstag="' + b + '" data-type="' + d.type + '" id="' + d.id + '">');
                c.push('<a href="' + e + '" ' + a + ">");
                c.push('<span class="prism_icon_tab">');
                c.push('<em class="prism_iconfont">' + d.iconfont + "</em>");
                c.push("</span>");
                c.push('<u class="prism_icon_text">' + d.text + "</u>");
                c.push("</a>");
                c.push("</div>")
            } else {
                if (d.type == "adv") {
                    c.push('<div class="prism_nav_tab" data-type="' + d.type + '" id="' + d.id + '">');
                    c.push("</div>")
                } else {
                    if (d.type == "coin") {
                        c.push('<div class="prism_nav_tab prism_wilful_coin_wrap" data-type="" id="' + d.id + '">');
                        c.push('<a href="javascript:;">');
                        c.push('<div class="prism_wc_icon"><span></span></div>');
                        c.push('<em class="prism_wc_pic"><u></u></em>');
                        c.push('<div class="prism_wc_getcoin none"></div>');
                        c.push("</a>");
                        c.push("</div>")
                    }
                }
            }
        }
        return c.join("")
    }

    function x() {
        n("#prismWrap").on("click", "#prismBacktop", function () {
            n("body, html").stop().animate({scrollTop: 0})
        }).on("mouseenter", ".prism_icon_wrap", function () {
            n(this).addClass("prism_icon_hover")
        }).on("mouseleave", ".prism_icon_wrap", function () {
            n(this).removeClass("prism_icon_hover")
        })
    }

    function o() {
        var b = n("#prismQRCode").hide();
        if (!!globalPrismQRPng) {
            var a = [];
            a.push('<div class="prism_tips_wrap prism_yhd_code none">');
            a.push('<p style="text-align:center;">' + window.globalPrismQRName + "<br/>" + window.globalPrismQRTitle + "</p>");
            a.push('<img src="' + window.globalPrismQRPng + '">');
            a.push('<em class="tips_arrow"></em>');
            a.push("</div>");
            b.find(".prism_tips_wrap").remove().end().append(a.join(""));
            b.find(".prism_icon_text").addClass("none");
            b.show()
        }
    }

    n(function () {
        t();
        loli.prism.functions.init()
    })
})(jQuery);
(function (g) {
    var k = window.loli || (window.loli = {});
    var h = {
        reloadPage: function (a) {
            var b = i(window.location.href, a);
            window.location.href = b
        }, refreshPage: function (d, a, b) {
            var c = i(d, a, b);
            window.location.href = c
        }, openPage: function (p, f, a, e, b) {
            var c = i(f, p, b);
            var o = "";
            if (typeof(a) != "undefined" && a) {
                o = a
            }
            var d = "";
            if (typeof(e) != "undefined" && e) {
                d = e
            }
            window.open(c, o, d)
        }, isVisual: function (c) {
            if (!c) {
                return false
            }
            var d = c.offsetHeight;
            var a = document.documentElement.clientHeight;
            var e = document.documentElement.scrollTop || document.body.scrollTop;
            var b = l(c).top + d / 2;
            if (b < a + e && b > e) {
                return true
            } else {
                return false
            }
        }, isVisualByTop: function (c) {
            if (!c) {
                return false
            }
            var a = l(c).top;
            var e = document.documentElement.clientHeight;
            var b = a + c.offsetHeight;
            var d = document.documentElement.scrollTop || document.body.scrollTop;
            if ((a <= e + d && a >= d) || (a <= d && b >= d)) {
                return true
            } else {
                return false
            }
        }
    };

    function l(c) {
        var a = 0;
        var b = 0;
        while (c) {
            a += c.offsetTop;
            b += c.offsetLeft;
            c = c.offsetParent
        }
        return {top: a, left: b}
    }

    function i(c, a, f) {
        if (typeof(c) == "undefined" || !c) {
            return ""
        }
        var e = typeof(a);
        if (e == "undefined" || !a) {
            return c
        }
        var d = null;
        if (e == "string") {
            var b = a;
            var n = a.indexOf("#");
            if (n == -1) {
                b = "#" + b
            }
            d = g(b)
        } else {
            if (e == "object") {
                d = a
            }
        }
        if (!d) {
            return c
        }
        return c
    }

    function j(b, a) {
        return b.closest("[" + a + "]")
    }

    k.spm = h
})(jQuery);
(function (A) {
    var L = (typeof isSearchKeyWords != "undefined" && isSearchKeyWords == "1") ? 1 : 0;
    var w = (typeof isIndex != "undefined" && isIndex == 1) ? 1 : 0;
    var u = (typeof globalSearchSelectFlag != "undefined" && globalSearchSelectFlag == "0") ? 0 : 1;
    var y = (typeof globalSearchHotkeywordsFlag != "undefined" && globalSearchHotkeywordsFlag == "0") ? 0 : 1;
    var M = A("#keyword");
    var J = A("#searchSuggest");
    var E = A("#fix_keyword");
    var z = A("#fix_searchSuggest");
    var D = A("#leaf");
    var x = A("#hdSearchTab");
    var N = window.loli || (window.loli = {});
    var H = N.app = N.app || {};
    var B = H.search = H.search || {};
    var I = A.cookie("provinceId") || 1;
    var v = A.cookie("cityId") || 0;
    var K = A.cookie("yihaodian_uid");
    var F = false;
    var C = URLPrefix.search_keyword || "//search.yhd.com";
    B.delayCall = function (c, e, f, d) {
        A(c).data("lastTime", new Date().getTime());
        if (e) {
            var b = e.call(A(c));
            A(c).data("lastResult", b)
        }
        var a = setTimeout(function () {
            var g = A(c).data("lastTime") ? A(c).data("lastTime") : new Date().getTime();
            var h = (typeof A(c).data("lastResult") == "undefined" || A(c).data("lastResult")) ? true : false;
            var i = new Date().getTime();
            if (i - g >= (d - 50)) {
                if (f && h) {
                    f.call(A(c))
                }
            }
        }, d)
    };
    B.filterXml = function (a) {
        if (a != null && a != "" && typeof a == "string") {
            a = a.replace(/\&/g, "&amp;");
            a = a.replace(/\</g, "&lt;");
            a = a.replace(/\>/g, "&gt;");
            a = a.replace(/\\/g, "&#92;");
            a = a.replace(/\'/g, "&#039;");
            a = a.replace(/\"/g, "&#034;")
        }
        return a
    };
    B.filterJs = function (a) {
        if (a != null && a != "" && typeof a == "string") {
            a = a.replace(/\&/g, "%5C%26");
            a = a.replace(/\</g, "%5C%3C");
            a = a.replace(/\>/g, "%5C%3E");
            a = a.replace(/\\/g, "%5C%5C");
            a = a.replace(/\'/g, "%5C%27");
            a = a.replace(/\"/g, "%5C%22")
        }
        return a
    };
    B.filterInvalid = function (a) {
        if (a != null && a != "" && typeof a == "string") {
            a = A.trim(a)
        }
        return a
    };
    B.isIE = function () {
        var a = window.navigator.userAgent.toLowerCase();
        var c = /msie ([\d\.]+)/;
        if (c.test(a)) {
            var b = parseInt(c.exec(a)[1]);
            return b
        }
        return 0
    };
    function G(h, f) {
        var e = N.yhdStore;
        if (e && h != "" && h.length > 0) {
            var c = false;
            var b = 0;
            for (var d = 0; d < f.length; d++) {
                var g = f[d];
                if (g) {
                    if (decodeURIComponent(decodeURIComponent(g)) == decodeURIComponent(decodeURIComponent(h))) {
                        c = true;
                        b = d;
                        break
                    }
                }
            }
            if (!c) {
                f.push(h);
                if (f.length > 10) {
                    f.shift()
                }
            } else {
                if (b != f.length - 1) {
                    var a = f.splice(b, 1);
                    f.push(a[0])
                }
            }
            e.setFromRoot("search_keyword_history", f.join(","))
        }
    }

    B.showHistory = function (e, d) {
        if (!u) {
            return
        }
        var c = D.size() > 0 ? D.val() : "0";
        var b = A.trim(e.val());
        var g = A.trim(e.attr("original"));
        var f = N.yhdStore;
        var a = function () {
            var h = C + "/hotWord.do?keyword=&rtnNum=10&callback=?";
            A.getJSON(h, function (m) {
                if (m.ERROR) {
                    return
                } else {
                    if (!m.success) {
                        return
                    }
                    var k = '<div class="hd_search_history_new"><dl class="hd_s_history"></dl><dl class="hd_h_search clearfix"><dt>æ­£åœ¨çƒ­æœä¸­</dt>';
                    for (var i = 0; i < m.success.length; i++) {
                        var n = m.success[i];
                        var o = B.filterInvalid(decodeURIComponent(decodeURIComponent(n)));
                        k += "<dd><a href=\"javascript:searchMe('" + B.filterJs(o) + "');\" class='hd_suggest_item'>" + n + "</a></dd>\n"
                    }
                    k += '</dl></div><div class="hd_cleared_searches">å·²æ¸…é™¤è¿‘æœŸæœç´¢è®°å½•</div>';
                    d.html(k);
                    var j;
                    if (f) {
                        f.getFromRoot("search_keyword_history", function (t) {
                            if (t && t.status == 1) {
                                var q = t.value;
                                if (q) {
                                    j = q.split(",")
                                }
                                var s = "";
                                if (typeof(j) != "undefined" && j.length > 0) {
                                    s += '<dt><a id="hd_clear_history_record" href="javascript:void(0);" onclick="clearRecord(this);">æ¸…é™¤</a>åŽ†å²è®°å½•</dt>';
                                    for (var r = j.length - 1; r >= 0; r--) {
                                        var p = B.filterInvalid(decodeURIComponent(decodeURIComponent(j[r])));
                                        if (p != null && p.length > 0) {
                                            s += "<dd>";
                                            s += '<a roll="true" href="javascript:searchMe(\'' + B.filterJs(p) + "');\"   >" + B.filterXml(p) + "</a></dd>"
                                        }
                                    }
                                } else {
                                    s = "<dt>åŽ†å²è®°å½•</dt>"
                                }
                            } else {
                                s = "<dt>åŽ†å²è®°å½•</dt>"
                            }
                            d.find(".hd_s_history").html(s)
                        })
                    } else {
                        var l = "<dt>åŽ†å²è®°å½•</dt>";
                        d.find(".hd_s_history").html(l)
                    }
                    d.addClass("hd_search_history");
                    if (typeof(j) == "undefined" || j.length == 0) {
                        A("#hd_clear_history_record", d).hide()
                    }
                    d.show()
                }
            })
        };
        if (b == "" || b == "è¯·è¾“å…¥å…³é”®è¯" || (b == g && !L)) {
            a()
        }
    };
    B.showSuggest = function (f, c) {
        if (!u) {
            return
        }
        var b = D.size() > 0 ? D.val() : "0";
        var d = A.trim(f.val());
        var e = A.trim(f.attr("original"));
        var a = function () {
            var g = C + "/smartBox.do?keyword=" + encodeURIComponent(encodeURIComponent(B.filterInvalid(d))) + "&callback=?";
            A.getJSON(g, function (o) {
                if (o.ERROR) {
                    return
                } else {
                    var h = '<ul class="none">';
                    var k = 10;
                    if (!o.success) {
                        return
                    }
                    for (var n = 0; n < o.success.length; n++) {
                        var j = o.success[n];
                        if (j.attrs) {
                            for (var p = 0; p < j.attrs.length; p++) {
                                if (k <= 0) {
                                    break
                                }
                                var l = j.attrs[p];
                                h += "<li><a onmousedown=\"searchMe('" + j.keyword + " " + l + "');\" href=\"javascript:void(0);\" class='hd_suggest_item'><b>" + j.keyword + "</b>&nbsp;" + l + "</a></li>\n";
                                k--
                            }
                        } else {
                            if (k <= 0) {
                                break
                            }
                            h += "<li><a onmousedown=\"searchMe('" + j.keyword + "');\" href=\"javascript:void(0);\" class='hd_suggest_item' ><b>" + j.keyword + "</b></a></li>\n";
                            k--
                        }
                    }
                    h += "</ul>";
                    c.html(h);
                    c.removeClass("hd_search_history");
                    var i = c.find("ul>li");
                    var m = false;
                    i.each(function () {
                        if (A(this).hasClass("haslist")) {
                            m = true
                        }
                    });
                    if (m) {
                        c.children("ul").css("height", "360px")
                    }
                    c.show();
                    c.find("ul").show();
                    require(["header"], function (q) {
                        q.search()
                    })
                }
            })
        };
        if ((d != "" && d != "è¯·è¾“å…¥å…³é”®è¯" && d != e) || (d == e && L)) {
            a()
        }
    };
    B.registerGlobalEvent = function () {
        A("#site_header").find(".hd_search_wrap").bind("mouseleave", function () {
            J.hide()
        });
        A(document).bind("click", function (e) {
            var f = e.target;
            if (f.id == "hd_clear_history_record" || f.className == "keywordInput" || f.className == "fl") {
                return
            }
            J.hide();
            z.hide()
        });
        var d = function (h, g, e) {
            h = h || window.event;
            var f = h.keyCode;
            if (f == "13") {
                searchMe(g, "0", "0")
            }
        };
        var a = function (f, k, i) {
            var e = A(".hd_search_form").hasClass("hd_search_fixed");
            if (e) {
                return
            }
            f = f || window.event;
            var j = f.keyCode;
            if (j == "116" || j == "16" || j == "17" || j == "18" || j == "38" || j == "40" || j == "13") {
                return
            }
            var g = A.trim(k.val());
            var h = A.trim(k.attr("original"));
            if (g == "" || g == "è¯·è¾“å…¥å…³é”®è¯" || (g == h && !L)) {
                B.delayCall(k, null, function () {
                    B.showHistory(k, i)
                }, 200)
            } else {
                B.delayCall(k, null, function () {
                    B.showSuggest(k, i)
                }, 200)
            }
        };
        var b = function (l, f, j) {
            l = l || window.event;
            if (l) {
                var k = document.createElement("input").webkitSpeech === undefined;
                if (!k) {
                    var m = l.pageX;
                    var i = f.outerWidth();
                    var g = f.offset().left;
                    var e = g + i - 25;
                    var h = g + i;
                    if (m >= e && m <= h) {
                        return
                    }
                }
            }
            a(l, f, j)
        };
        M.keydown(function (e) {
            d(e, M, J)
        });
        M.keyup(function (e) {
            a(e, M, J)
        });
        M.click(function (e) {
            b(e, M, J)
        });
        E.keydown(function (f) {
            f = f || window.event;
            var e = f.keyCode;
            if (e == "13") {
                searchMe(E, "0", "0")
            }
        });
        x.mouseenter(function () {
            A(this).addClass("hd_serach_tab_hover")
        });
        x.mouseleave(function () {
            A(this).removeClass("hd_serach_tab_hover")
        });
        x.delegate("a", "click", function () {
            var e = A(this).index();
            if (e !== 0) {
                A(this).prependTo(x);
                x.attr("data-type", A(this).attr("data-type"));
                x.removeClass("hd_serach_tab_hover");
                if (x.attr("data-type") == "2") {
                    x.next().attr("data-tpa", "YHD_GLOBAl_HEADER_SEARCHSHOP").removeAttr("data-tc")
                } else {
                    x.next().attr("data-tpa", "YHD_GLOBAl_HEADER_SEARCH").removeAttr("data-tc")
                }
            }
        });
        var c = function (g, f) {
            var e = N.yhdStore;
            e.setFromRoot("search_keyword_history", "");
            g.hide();
            A(".hd_s_history dd", f).remove()
        };
        J.delegate("#hd_clear_history_record", "click", function () {
            var e = A(this);
            c(e, J)
        });
        z.delegate("#hd_clear_history_record", "click", function () {
            var e = A(this);
            c(e, z)
        });
        J.delegate("#choose_list dd", "mouseover", function () {
            A(this).find("#s_cart_btn").show();
            return false
        });
        J.delegate("#choose_list dd", "mouseout", function () {
            A(this).find("#s_cart_btn").hide();
            return false
        });
        z.delegate("#choose_list dd", "mouseover", function () {
            A(this).find("#s_cart_btn").show();
            return false
        });
        z.delegate("#choose_list dd", "mouseout", function () {
            A(this).find("#s_cart_btn").hide();
            return false
        })
    };
    B.loadHotKeywords = function () {
        var c = A.trim(M.val());
        var b = A.trim(M.attr("original"));
        if (A("#hotKeywordsShow").size() == 0) {
            return
        }
        if (!y) {
            return
        }
        var d = function (l) {
            var e = 1;
            var k = 1;
            var f = URLPrefix.search_keyword + "/hotWord.do?rtnNum=10";
            if ((typeof(c) != "undefined" && c != "" && c != b) || (c == b && L)) {
                f += "&keyword=" + encodeURIComponent(encodeURIComponent(B.filterInvalid(c)))
            }
            var j = A("#curCategoryIdToGlobal").val();
            if (typeof(j) != "undefined") {
                f += "&categoryId=" + j
            }
            if (l) {
                f += "&historyKeywords=" + l
            }
            f += "&provinceId=" + I;
            f += "&cityId=" + v;
            var g = A("#hotKeywordsShow");
            if (g.data("isLoaded") == "1") {
                return
            }
            g.data("isLoaded", "1");
            var i = function (p) {
                if (w == 1) {
                    var o = g.attr("data-specialHotword");
                    var n = (typeof globalSpecialHotwordFlag != "undefined" && globalSpecialHotwordFlag == "0") ? 0 : 1;
                    if (n && o) {
                        var q = A.parseJSON(o);
                        if (q && q.text && q.linkUrl) {
                            var m = "<a title='" + q.text + "' href='" + q.linkUrl + "' target='_blank' data-tc='" + (q.tc || "") + "' data-tce='" + (q.tce || "") + "'  data-ref='" + q.perTracker + "'>" + q.text + "</a>";
                            p = m + p
                        }
                    }
                }
                return p
            };
            try {
                A.ajax({
                    url: f,
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback: "keywordRecommendCallback",
                    cache: true,
                    timeout: 3000,
                    success: function (n) {
                        if (n && n.success && n.success.length > 0) {
                            var r = n.success;
                            var p = [];
                            for (var q = 0; q < r.length; q++) {
                                var s = r[q];
                                var m = "";
                                var t = URLPrefix.search_keyword + "/c0-0/k" + encodeURIComponent(encodeURIComponent(s)) + "/";
                                m = '<a   title="' + s + '" target="_blank" href="' + t + '">' + s + "</a>";
                                p.push(m)
                            }
                            if (p.length > 0) {
                                var o = i(p.join(" "));
                                g.html("").append(o);
                                g.data("searchKeyLoaded", "1")
                            }
                        }
                    }
                })
            } catch (h) {
            }
        };
        d("");
        if (typeof headerType != "undefined" && (headerType == "search" || headerType == "base")) {
            var a = N.yhdStore;
            if (a) {
                a.getFromRoot("search_keyword_history", function (e) {
                    var g = [];
                    if (e && e.status == 1) {
                        var f = e.value;
                        if (f) {
                            g = f.split(",")
                        }
                    }
                    G(c, g)
                })
            }
        }
    };
    B.changeTab = function (c) {
        if (typeof c == "undefined" || isNaN(c) || a == c || (c != "1" && c != "2")) {
            return
        }
        var a = x.attr("data-type");
        var b = x.find("a[data-type='" + c + "']");
        b.prependTo(x);
        x.attr("data-type", b.attr("data-type"));
        x.removeClass("hd_serach_tab_hover");
        if (x.attr("data-type") == "2") {
            x.next().attr("data-tpa", "YHD_GLOBAl_HEADER_SEARCHSHOP").removeAttr("data-tc")
        } else {
            x.next().attr("data-tpa", "YHD_GLOBAl_HEADER_SEARCH").removeAttr("data-tc")
        }
    };
    A(document).ready(function () {
        B.registerGlobalEvent();
        B.loadHotKeywords()
    })
})(jQuery);
function emptySearchBar(g) {
    if (!g) {
        g = "#keyword"
    }
    var f = $(g);
    var j = f.parent("div").find("label");
    var i = f.attr("original");
    var h = f.val();
    if (f.val() != "" && j.size() > 0) {
        j.hide();
        f.trigger("click");
        return
    }
    if (h.indexOf(i) == 0) {
        f.val(h.substring(i.length));
        f.css("color", "#333333")
    }
    if (f.val() != "") {
        f.trigger("click")
    }
}
function searchRecommend(b) {
    if (b != null && b != "") {
        window.location = b
    }
}
function searchMe(u, w, x, q) {
    var s = null;
    var n = document.getElementById("recommendId");
    if (n) {
        s = n.value
    }
    var v = null;
    var r = document.getElementById("recommendName");
    if (r) {
        v = r.value
    }
    var o = $("#keyword");
    if (!u) {
        u = o.val()
    } else {
        if (u instanceof jQuery) {
            o = u;
            u = o.val()
        }
    }
    if (u != null && u != "") {
        var z = $.trim(o.attr("original"));
        if (z != null && z != "" && z != "è¯·è¾“å…¥å…³é”®è¯") {
            if (z == u) {
                var p = o.attr("url");
                if (p != null && p != "") {
                    loli.spm.refreshPage(p, o);
                    return
                }
            }
        }
    } else {
        var p = o.attr("url");
        if (p != null && p != "") {
            loli.spm.refreshPage(p, o);
            return
        }
    }
    u = $.trim(u);
    if (!u) {
        o.val("");
        return
    }
    if (u == "è¯·è¾“å…¥å…³é”®è¯") {
        return
    }
    var t = "0";
    if ($("#leaf").size() > 0) {
        t = $("#leaf").val()
    }
    if (q) {
        var y = URLPrefix.search_keyword + "/c0-0-0/b/a-s1-v2-p1-price-d0-f0b-m1-rt0-pid-mid0-k" + encodeURIComponent(encodeURIComponent(u)) + "/";
        loli.spm.refreshPage(y, o);
        return
    }
    if (w != null && w != "0") {
        var y = URLPrefix.search_keyword + "/c" + w + "-" + x + "/k" + encodeURIComponent(encodeURIComponent(u)) + "/";
        loli.spm.refreshPage(y, o)
    } else {
        if (s != null && s != "") {
            var y = URLPrefix.search_keyword + "/c" + s + "-" + v + "/k" + encodeURIComponent(encodeURIComponent(u)) + "/";
            loli.spm.refreshPage(y, o)
        } else {
            var y = URLPrefix.search_keyword + "/c" + t + "-0/k" + encodeURIComponent(encodeURIComponent(u)) + "/";
            loli.spm.refreshPage(y, o)
        }
    }
}
function searchMeForClick() {
    var b = $("#hdSearchTab");
    if (b.size() > 0 && b.attr("data-type") == "2") {
        searchMe(null, null, null, 1);
        return
    }
    searchMe()
}
function searchInputFocus(g) {
    var h = $("#keyword");
    if (g) {
        h = $(g)
    }
    if (h.size() == 0) {
        return
    }
    var i = h.attr("original");
    var j = h.val();
    var f = (typeof isSearchKeyWords != "undefined" && isSearchKeyWords == "1") ? 1 : 0;
    if (j == null || j == "") {
        if (i == null || i == "") {
            i = "è¯·è¾“å…¥å…³é”®è¯";
            h.attr("original", i)
        }
        h.val(i);
        j = i
    }
    if (!f) {
        h.css("color", "#999999");
        h.bind("focus", function () {
            if (this.value == i) {
                this.value = "";
                this.style.color = "#333333"
            }
        }).bind("blur", function () {
            if (this.value == "") {
                this.value = i;
                this.style.color = "#999999"
            }
        })
    } else {
        h.css("color", "#333333");
        h.bind("blur", function () {
            if (this.value == "") {
                this.value = i
            }
        })
    }
}
function indexSearchInputFocus() {
    var d = $("#keyword").attr("original");
    var f = $("#keyword").val();
    var e = $("#keyword").parent("div").find("label");
    if (e.size() == 0) {
        return
    }
    if (f == d || f == "") {
        e.css({display: "block"});
        $("#keyword").css("color", "#333333")
    }
    $("#keyword").bind("focus", function () {
        e.css({color: "#CCCCCC"});
        if (this.value == d) {
            this.style.color = "#CCCCCC"
        } else {
            this.style.color = "#333333"
        }
    }).bind("blur", function () {
        if (this.value == "" || this.value == d || this.value == "è¯·è¾“å…¥å…³é”®è¯") {
            e.css({color: "#666666", display: "block"});
            $("#keyword").val("");
            $("#keyword").placeholder("")
        }
    }).bind("keydown", function () {
        if (this.value == "" || this.value == d) {
            e.hide()
        }
    })
}
$(document).ready(function () {
    if (loli.app.search.isIE() && loli.app.search.isIE() <= 8) {
        indexSearchInputFocus();
        if (typeof isFixTopNav != "undefined" && isFixTopNav == true) {
            searchInputFocus("#fix_keyword")
        }
    }
    if (typeof headerType != "undefined" && headerType == "search") {
        $("#fix_keyword").bind("focus", function () {
            $(this).removeClass("hd_ipt_corner").addClass("focus_ipt")
        });
        $("#fix_keyword").bind("blur", function () {
            $(this).addClass("hd_ipt_corner").removeClass("focus_ipt")
        })
    }
});
