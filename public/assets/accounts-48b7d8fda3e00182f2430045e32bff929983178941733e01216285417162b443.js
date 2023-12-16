/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
// By: Hans Fj�llemark and John Papa
// https://github.com/CodeSeven/toastr
// 
// Modified to support css styling instead of inline styling
// Inspired by https://github.com/Srirangan/notifer.js/

;(function(window, $) {
    window.toastr = (function() {
        var 
            defaults = {
                tapToDismiss: true,
                toastClass: 'toast',
                containerId: 'toast-container',
                debug: false,
                fadeIn: 300,
                fadeOut: 1000,
                extendedTimeOut: 1000,
                iconClasses: {
                    error: 'toast-error',
                    info: 'toast-info',
                    success: 'toast-success',
                    warning: 'toast-warning'
                },
                iconClass: 'toast-info',
                positionClass: 'toast-top-right',
                timeOut: 5000, // Set timeOut to 0 to make it sticky
                titleClass: 'toast-title',
                messageClass: 'toast-message'
            },


            error = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    title: title
                })
            },

            getContainer = function(options) {
                var $container = $('#' + options.containerId)

                if ($container.length)
                    return $container

                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass)

                $container.appendTo($('body'))

                return $container
            },

            getOptions = function() {
                return $.extend({}, defaults, toastr.options)
            },

            info = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    title: title
                })
            },

            notify = function(map) {
                var 
                    options = getOptions(),
                    iconClass = map.iconClass || options.iconClass,
                    intervalId = null,
                    $container = getContainer(options),
                    $toastElement = $('<div/>'),
                    $titleElement = $('<div/>'),
                    $messageElement = $('<div/>'),
                    response = { options: options, map: map }

                if (map.iconClass) {
                    $toastElement.addClass(options.toastClass).addClass(iconClass)
                }

                if (map.title) {
                    $titleElement.append(map.title).addClass(options.titleClass)
                    $toastElement.append($titleElement)
                }

                if (map.message) {
                    $messageElement.append(map.message).addClass(options.messageClass)
                    $toastElement.append($messageElement)
                }

                var fadeAway = function() {
                    if ($(':focus', $toastElement).length > 0)
                		return
                	
                    var fade = function() {
                        return $toastElement.fadeOut(options.fadeOut)
                    }

                    $.when(fade()).done(function() {
                        if ($toastElement.is(':visible')) {
                            return
                        }
                        $toastElement.remove()
                        if ($container.children().length === 0)
                            $container.remove()
                    })
                }

                var delayedFadeAway = function() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(fadeAway, options.extendedTimeOut)
                    }
                }

                var stickAround = function() {
                    clearTimeout(intervalId)
                    $toastElement.stop(true, true)
                        .fadeIn(options.fadeIn)
                }

                $toastElement.hide()
                $container.prepend($toastElement)
                $toastElement.fadeIn(options.fadeIn)

                if (options.timeOut > 0) {
                    intervalId = setTimeout(fadeAway, options.timeOut)
                }

                $toastElement.hover(stickAround, delayedFadeAway)

                if (options.tapToDismiss) {
                    $toastElement.click(fadeAway)
                }

                if (options.debug) {
                    console.log(response)
                }
                return $toastElement
            },

            success = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    title: title
                })
            },

            warning = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    title: title
                })
            }

        return {
            error: error,
            info: info,
            options: {},
            success: success,
            warning: warning
        }
    })()
} (window, jQuery));
/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/main/actionview/app/assets/javascripts
Released under the MIT license
 */
;

(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form:not([data-turbo=true])',
        formInputClickSelector: 'form:not([data-turbo=true]) input[type=submit], form:not([data-turbo=true]) input[type=image], form:not([data-turbo=true]) button[type=submit], form:not([data-turbo=true]) button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var nonce;

      nonce = null;

      Rails.loadCSPNonce = function() {
        var ref;
        return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
      };

      Rails.cspNonce = function() {
        return nonce != null ? nonce : Rails.loadCSPNonce();
      };

    }).call(this);
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.isContentEditable = function(element) {
        var isEditable;
        isEditable = false;
        while (true) {
          if (element.isContentEditable) {
            isEditable = true;
            break;
          }
          element = element.parentElement;
          if (!element) {
            break;
          }
        }
        return isEditable;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches, preventDefault;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
        preventDefault = CustomEvent.prototype.preventDefault;
        CustomEvent.prototype.preventDefault = function() {
          var result;
          result = preventDefault.call(this);
          if (this.cancelable && !this.defaultPrevented) {
            Object.defineProperty(this, 'defaultPrevented', {
              get: function() {
                return true;
              }
            });
          }
          return result;
        };
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, cspNonce, fire, prepareOptions, processResponse;

      cspNonce = Rails.cspNonce, CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var ref, response;
          response = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if ((options.beforeSend != null) && !options.beforeSend(xhr, options)) {
          return false;
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          CSRFProtection(xhr);
        }
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.setAttribute('nonce', cspNonce());
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name || input.disabled) {
            return;
          }
          if (matches(input, 'fieldset[disabled] *')) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      Rails.confirm = function(message, element) {
        return confirm(message);
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = Rails.confirm(message, element);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, isContentEditable, isXhrRedirect, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements, isContentEditable = Rails.isContentEditable;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        if (e instanceof Event) {
          if (isXhrRedirect(e)) {
            return;
          }
          element = e.target;
        } else {
          element = e;
        }
        if (isContentEditable(element)) {
          return;
        }
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (isContentEditable(element)) {
          return;
        }
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        if (getData(element, 'ujs:disabled')) {
          return;
        }
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        if (getData(element, 'ujs:disabled')) {
          return;
        }
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

      isXhrRedirect = function(event) {
        var ref, xhr;
        xhr = (ref = event.detail) != null ? ref[0] : void 0;
        return (xhr != null ? xhr.getResponseHeader("X-Xhr-Redirect") : void 0) != null;
      };

    }).call(this);
    (function() {
      var isContentEditable, stopEverything;

      stopEverything = Rails.stopEverything;

      isContentEditable = Rails.isContentEditable;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        if (isContentEditable(this)) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isContentEditable, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement, isContentEditable = Rails.isContentEditable;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        if (isContentEditable(element)) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return false;
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.preventInsignificantClick = function(e) {
        var data, insignificantMetaClick, link, metaClick, method, nonPrimaryMouseClick;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        insignificantMetaClick = metaClick && method === 'GET' && !data;
        nonPrimaryMouseClick = (e.button != null) && e.button !== 0;
        if (nonPrimaryMouseClick || insignificantMetaClick) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMethod, handleRemote, loadCSPNonce, preventInsignificantClick, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, loadCSPNonce = Rails.loadCSPNonce, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, preventInsignificantClick = Rails.preventInsignificantClick, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null)) {
        if (jQuery.rails) {
          throw new Error('If you load both jquery_ujs and rails-ujs, use rails-ujs only.');
        }
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        document.addEventListener('DOMContentLoaded', loadCSPNonce);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(x,e){"use strict";function g(e){return null!=e&&e===e.window}var t=[],E=x.document,n=Object.getPrototypeOf,a=t.slice,m=t.concat,l=t.push,r=t.indexOf,i={},o=i.toString,v=i.hasOwnProperty,s=v.toString,c=s.call(Object),y={},b=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},u={type:!0,src:!0,nonce:!0,noModule:!0};function _(e,t,n){var i,r,o=(n=n||E).createElement("script");if(o.text=e,t)for(i in u)(r=t[i]||t.getAttribute&&t.getAttribute(i))&&o.setAttribute(i,r);n.head.appendChild(o).parentNode.removeChild(o)}function h(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?i[o.call(e)]||"object":typeof e}var f="3.4.1",T=function(e,t){return new T.fn.init(e,t)},d=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;function p(e){var t=!!e&&"length"in e&&e.length,n=h(e);return!b(e)&&!g(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}T.fn=T.prototype={jquery:f,constructor:T,length:0,toArray:function(){return a.call(this)},get:function(e){return null==e?a.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){e=T.merge(this.constructor(),e);return e.prevObject=this,e},each:function(e){return T.each(this,e)},map:function(n){return this.pushStack(T.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(a.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,e=+e+(e<0?t:0);return this.pushStack(0<=e&&e<t?[this[e]]:[])},end:function(){return this.prevObject||this.constructor()},push:l,sort:t.sort,splice:t.splice},T.extend=T.fn.extend=function(){var e,t,n,i,r,o=arguments[0]||{},s=1,a=arguments.length,l=!1;for("boolean"==typeof o&&(l=o,o=arguments[s]||{},s++),"object"==typeof o||b(o)||(o={}),s===a&&(o=this,s--);s<a;s++)if(null!=(e=arguments[s]))for(t in e)n=e[t],"__proto__"!==t&&o!==n&&(l&&n&&(T.isPlainObject(n)||(i=Array.isArray(n)))?(r=o[t],r=i&&!Array.isArray(r)?[]:i||T.isPlainObject(r)?r:{},i=!1,o[t]=T.extend(l,r,n)):void 0!==n&&(o[t]=n));return o},T.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){return!(!e||"[object Object]"!==o.call(e))&&(!(e=n(e))||"function"==typeof(e=v.call(e,"constructor")&&e.constructor)&&s.call(e)===c)},isEmptyObject:function(e){for(var t in e)return!1;return!0},globalEval:function(e,t){_(e,{nonce:t&&t.nonce})},each:function(e,t){var n,i=0;if(p(e))for(n=e.length;i<n&&!1!==t.call(e[i],i,e[i]);i++);else for(i in e)if(!1===t.call(e[i],i,e[i]))break;return e},trim:function(e){return null==e?"":(e+"").replace(d,"")},makeArray:function(e,t){t=t||[];return null!=e&&(p(Object(e))?T.merge(t,"string"==typeof e?[e]:e):l.call(t,e)),t},inArray:function(e,t,n){return null==t?-1:r.call(t,e,n)},merge:function(e,t){for(var n=+t.length,i=0,r=e.length;i<n;i++)e[r++]=t[i];return e.length=r,e},grep:function(e,t,n){for(var i=[],r=0,o=e.length,s=!n;r<o;r++)!t(e[r],r)!=s&&i.push(e[r]);return i},map:function(e,t,n){var i,r,o=0,s=[];if(p(e))for(i=e.length;o<i;o++)null!=(r=t(e[o],o,n))&&s.push(r);else for(o in e)null!=(r=t(e[o],o,n))&&s.push(r);return m.apply([],s)},guid:1,support:y}),"function"==typeof Symbol&&(T.fn[Symbol.iterator]=t[Symbol.iterator]),T.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){i["[object "+t+"]"]=t.toLowerCase()});var w=function(n){function f(e,t,n){var i="0x"+t-65536;return i!=i||n?t:i<0?String.fromCharCode(65536+i):String.fromCharCode(i>>10|55296,1023&i|56320)}function i(){x()}var e,d,_,o,r,p,h,g,w,l,c,x,E,s,T,m,a,u,v,k="sizzle"+ +new Date,y=n.document,A=0,b=0,S=le(),C=le(),L=le(),D=le(),j=function(e,t){return e===t&&(c=!0),0},O={}.hasOwnProperty,t=[],N=t.pop,P=t.push,H=t.push,R=t.slice,W=function(e,t){for(var n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1},I="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",q="\\["+M+"*("+F+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+F+"))|)"+M+"*\\]",Y=":("+F+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+q+")*)|.*)\\)|)",X=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),$=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),K=new RegExp(Y),V=new RegExp("^"+F+"$"),Q={ID:new RegExp("^#("+F+")"),CLASS:new RegExp("^\\.("+F+")"),TAG:new RegExp("^("+F+"|[*])"),ATTR:new RegExp("^"+q),PSEUDO:new RegExp("^"+Y),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+I+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},G=/HTML$/i,Z=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,ee=/^[^{]+\{\s*\[native \w/,te=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ne=/[+~]/,ie=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,oe=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},se=ye(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=R.call(y.childNodes),y.childNodes),t[y.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){P.apply(e,R.call(t))}:function(e,t){for(var n=e.length,i=0;e[n++]=t[i++];);e.length=n-1}}}function ae(t,e,n,i){var r,o,s,a,l,c,u=e&&e.ownerDocument,f=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==f&&9!==f&&11!==f)return n;if(!i&&((e?e.ownerDocument||e:y)!==E&&x(e),e=e||E,T)){if(11!==f&&(a=te.exec(t)))if(c=a[1]){if(9===f){if(!(o=e.getElementById(c)))return n;if(o.id===c)return n.push(o),n}else if(u&&(o=u.getElementById(c))&&v(e,o)&&o.id===c)return n.push(o),n}else{if(a[2])return H.apply(n,e.getElementsByTagName(t)),n;if((c=a[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(c)),n}if(d.qsa&&!D[t+" "]&&(!m||!m.test(t))&&(1!==f||"object"!==e.nodeName.toLowerCase())){if(c=t,u=e,1===f&&U.test(t)){for((s=e.getAttribute("id"))?s=s.replace(re,oe):e.setAttribute("id",s=k),r=(l=p(t)).length;r--;)l[r]="#"+s+" "+ve(l[r]);c=l.join(","),u=ne.test(t)&&ge(e.parentNode)||e}try{return H.apply(n,u.querySelectorAll(c)),n}catch(e){D(t,!0)}finally{s===k&&e.removeAttribute("id")}}}return g(t.replace(B,"$1"),e,n,i)}function le(){var n=[];function i(e,t){return n.push(e+" ")>_.cacheLength&&delete i[n.shift()],i[e+" "]=t}return i}function ce(e){return e[k]=!0,e}function ue(e){var t=E.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){for(var n=e.split("|"),i=n.length;i--;)_.attrHandle[n[i]]=t}function de(e,t){var n=t&&e,i=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(i)return i;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function pe(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&se(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function he(s){return ce(function(o){return o=+o,ce(function(e,t){for(var n,i=s([],e.length,o),r=i.length;r--;)e[n=i[r]]&&(e[n]=!(t[n]=e[n]))})})}function ge(e){return e&&void 0!==e.getElementsByTagName&&e}for(e in d=ae.support={},r=ae.isXML=function(e){var t=e.namespaceURI,e=(e.ownerDocument||e).documentElement;return!G.test(t||e&&e.nodeName||"HTML")},x=ae.setDocument=function(e){var t,e=e?e.ownerDocument||e:y;return e!==E&&9===e.nodeType&&e.documentElement&&(s=(E=e).documentElement,T=!r(E),y!==E&&(t=E.defaultView)&&t.top!==t&&(t.addEventListener?t.addEventListener("unload",i,!1):t.attachEvent&&t.attachEvent("onunload",i)),d.attributes=ue(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ue(function(e){return e.appendChild(E.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=ee.test(E.getElementsByClassName),d.getById=ue(function(e){return s.appendChild(e).id=k,!E.getElementsByName||!E.getElementsByName(k).length}),d.getById?(_.filter.ID=function(e){var t=e.replace(ie,f);return function(e){return e.getAttribute("id")===t}},_.find.ID=function(e,t){if(void 0!==t.getElementById&&T){e=t.getElementById(e);return e?[e]:[]}}):(_.filter.ID=function(e){var t=e.replace(ie,f);return function(e){e=void 0!==e.getAttributeNode&&e.getAttributeNode("id");return e&&e.value===t}},_.find.ID=function(e,t){if(void 0!==t.getElementById&&T){var n,i,r,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];for(r=t.getElementsByName(e),i=0;o=r[i++];)if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),_.find.TAG=d.getElementsByTagName?function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,i=[],r=0,o=t.getElementsByTagName(e);if("*"!==e)return o;for(;n=o[r++];)1===n.nodeType&&i.push(n);return i},_.find.CLASS=d.getElementsByClassName&&function(e,t){if(void 0!==t.getElementsByClassName&&T)return t.getElementsByClassName(e)},a=[],m=[],(d.qsa=ee.test(E.querySelectorAll))&&(ue(function(e){s.appendChild(e).innerHTML="<a id='"+k+"'></a><select id='"+k+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&m.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||m.push("\\["+M+"*(?:value|"+I+")"),e.querySelectorAll("[id~="+k+"-]").length||m.push("~="),e.querySelectorAll(":checked").length||m.push(":checked"),e.querySelectorAll("a#"+k+"+*").length||m.push(".#.+[+~]")}),ue(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=E.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&m.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&m.push(":enabled",":disabled"),s.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&m.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),m.push(",.*:")})),(d.matchesSelector=ee.test(u=s.matches||s.webkitMatchesSelector||s.mozMatchesSelector||s.oMatchesSelector||s.msMatchesSelector))&&ue(function(e){d.disconnectedMatch=u.call(e,"*"),u.call(e,"[s!='']:x"),a.push("!=",Y)}),m=m.length&&new RegExp(m.join("|")),a=a.length&&new RegExp(a.join("|")),t=ee.test(s.compareDocumentPosition),v=t||ee.test(s.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,t=t&&t.parentNode;return e===t||!(!t||1!==t.nodeType||!(n.contains?n.contains(t):e.compareDocumentPosition&&16&e.compareDocumentPosition(t)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},j=t?function(e,t){if(e===t)return c=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e===E||e.ownerDocument===y&&v(y,e)?-1:t===E||t.ownerDocument===y&&v(y,t)?1:l?W(l,e)-W(l,t):0:4&n?-1:1)}:function(e,t){if(e===t)return c=!0,0;var n,i=0,r=e.parentNode,o=t.parentNode,s=[e],a=[t];if(!r||!o)return e===E?-1:t===E?1:r?-1:o?1:l?W(l,e)-W(l,t):0;if(r===o)return de(e,t);for(n=e;n=n.parentNode;)s.unshift(n);for(n=t;n=n.parentNode;)a.unshift(n);for(;s[i]===a[i];)i++;return i?de(s[i],a[i]):s[i]===y?-1:a[i]===y?1:0}),E},ae.matches=function(e,t){return ae(e,null,null,t)},ae.matchesSelector=function(e,t){if((e.ownerDocument||e)!==E&&x(e),d.matchesSelector&&T&&!D[t+" "]&&(!a||!a.test(t))&&(!m||!m.test(t)))try{var n=u.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){D(t,!0)}return 0<ae(t,E,null,[e]).length},ae.contains=function(e,t){return(e.ownerDocument||e)!==E&&x(e),v(e,t)},ae.attr=function(e,t){(e.ownerDocument||e)!==E&&x(e);var n=_.attrHandle[t.toLowerCase()],n=n&&O.call(_.attrHandle,t.toLowerCase())?n(e,t,!T):void 0;return void 0!==n?n:d.attributes||!T?e.getAttribute(t):(n=e.getAttributeNode(t))&&n.specified?n.value:null},ae.escape=function(e){return(e+"").replace(re,oe)},ae.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},ae.uniqueSort=function(e){var t,n=[],i=0,r=0;if(c=!d.detectDuplicates,l=!d.sortStable&&e.slice(0),e.sort(j),c){for(;t=e[r++];)t===e[r]&&(i=n.push(r));for(;i--;)e.splice(n[i],1)}return l=null,e},o=ae.getText=function(e){var t,n="",i=0,r=e.nodeType;if(r){if(1===r||9===r||11===r){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===r||4===r)return e.nodeValue}else for(;t=e[i++];)n+=o(t);return n},(_=ae.selectors={cacheLength:50,createPseudo:ce,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(ie,f),e[3]=(e[3]||e[4]||e[5]||"").replace(ie,f),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ae.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ae.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&K.test(n)&&(t=p(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(ie,f).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=S[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&S(e,function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(t,n,i){return function(e){e=ae.attr(e,t);return null==e?"!="===n:!n||(e+="","="===n?e===i:"!="===n?e!==i:"^="===n?i&&0===e.indexOf(i):"*="===n?i&&-1<e.indexOf(i):"$="===n?i&&e.slice(-i.length)===i:"~="===n?-1<(" "+e.replace(X," ")+" ").indexOf(i):"|="===n&&(e===i||e.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,m){var v="nth"!==h.slice(0,3),y="last"!==h.slice(-4),b="of-type"===e;return 1===g&&0===m?function(e){return!!e.parentNode}:function(e,t,n){var i,r,o,s,a,l,c=v!=y?"nextSibling":"previousSibling",u=e.parentNode,f=b&&e.nodeName.toLowerCase(),d=!n&&!b,p=!1;if(u){if(v){for(;c;){for(s=e;s=s[c];)if(b?s.nodeName.toLowerCase()===f:1===s.nodeType)return!1;l=c="only"===h&&!l&&"nextSibling"}return!0}if(l=[y?u.firstChild:u.lastChild],y&&d){for(p=(a=(i=(r=(o=(s=u)[k]||(s[k]={}))[s.uniqueID]||(o[s.uniqueID]={}))[h]||[])[0]===A&&i[1])&&i[2],s=a&&u.childNodes[a];s=++a&&s&&s[c]||(p=a=0)||l.pop();)if(1===s.nodeType&&++p&&s===e){r[h]=[A,a,p];break}}else if(!1===(p=d?a=(i=(r=(o=(s=e)[k]||(s[k]={}))[s.uniqueID]||(o[s.uniqueID]={}))[h]||[])[0]===A&&i[1]:p))for(;(s=++a&&s&&s[c]||(p=a=0)||l.pop())&&((b?s.nodeName.toLowerCase()!==f:1!==s.nodeType)||!++p||(d&&((r=(o=s[k]||(s[k]={}))[s.uniqueID]||(o[s.uniqueID]={}))[h]=[A,p]),s!==e)););return(p-=m)===g||p%g==0&&0<=p/g}}},PSEUDO:function(e,o){var t,s=_.pseudos[e]||_.setFilters[e.toLowerCase()]||ae.error("unsupported pseudo: "+e);return s[k]?s(o):1<s.length?(t=[e,e,"",o],_.setFilters.hasOwnProperty(e.toLowerCase())?ce(function(e,t){for(var n,i=s(e,o),r=i.length;r--;)e[n=W(e,i[r])]=!(t[n]=i[r])}):function(e){return s(e,0,t)}):s}},pseudos:{not:ce(function(e){var i=[],r=[],a=h(e.replace(B,"$1"));return a[k]?ce(function(e,t,n,i){for(var r,o=a(e,null,i,[]),s=e.length;s--;)(r=o[s])&&(e[s]=!(t[s]=r))}):function(e,t,n){return i[0]=e,a(i,null,n,r),i[0]=null,!r.pop()}}),has:ce(function(t){return function(e){return 0<ae(t,e).length}}),contains:ce(function(t){return t=t.replace(ie,f),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:ce(function(n){return V.test(n||"")||ae.error("unsupported lang: "+n),n=n.replace(ie,f).toLowerCase(),function(e){var t;do{if(t=T?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===s},focus:function(e){return e===E.activeElement&&(!E.hasFocus||E.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:pe(!1),disabled:pe(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!_.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(e=e.getAttribute("type"))||"text"===e.toLowerCase())},first:he(function(){return[0]}),last:he(function(e,t){return[t-1]}),eq:he(function(e,t,n){return[n<0?n+t:n]}),even:he(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:he(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:he(function(e,t,n){for(var i=n<0?n+t:t<n?t:n;0<=--i;)e.push(i);return e}),gt:he(function(e,t,n){for(var i=n<0?n+t:n;++i<t;)e.push(i);return e})}}).pseudos.nth=_.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})_.pseudos[e]=function(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}(e);for(e in{submit:!0,reset:!0})_.pseudos[e]=function(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}(e);function me(){}function ve(e){for(var t=0,n=e.length,i="";t<n;t++)i+=e[t].value;return i}function ye(s,e,t){var a=e.dir,l=e.next,c=l||a,u=t&&"parentNode"===c,f=b++;return e.first?function(e,t,n){for(;e=e[a];)if(1===e.nodeType||u)return s(e,t,n);return!1}:function(e,t,n){var i,r,o=[A,f];if(n){for(;e=e[a];)if((1===e.nodeType||u)&&s(e,t,n))return!0}else for(;e=e[a];)if(1===e.nodeType||u)if(i=(r=e[k]||(e[k]={}))[e.uniqueID]||(r[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[a]||e;else{if((r=i[c])&&r[0]===A&&r[1]===f)return o[2]=r[2];if((i[c]=o)[2]=s(e,t,n))return!0}return!1}}function be(r){return 1<r.length?function(e,t,n){for(var i=r.length;i--;)if(!r[i](e,t,n))return!1;return!0}:r[0]}function _e(e,t,n,i,r){for(var o,s=[],a=0,l=e.length,c=null!=t;a<l;a++)(o=e[a])&&(n&&!n(o,i,r)||(s.push(o),c&&t.push(a)));return s}function we(p,h,g,m,v,e){return m&&!m[k]&&(m=we(m)),v&&!v[k]&&(v=we(v,e)),ce(function(e,t,n,i){var r,o,s,a=[],l=[],c=t.length,u=e||function(e,t,n){for(var i=0,r=t.length;i<r;i++)ae(e,t[i],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!p||!e&&h?u:_e(u,a,p,n,i),d=g?v||(e?p:c||m)?[]:t:f;if(g&&g(f,d,n,i),m)for(r=_e(d,l),m(r,[],n,i),o=r.length;o--;)(s=r[o])&&(d[l[o]]=!(f[l[o]]=s));if(e){if(v||p){if(v){for(r=[],o=d.length;o--;)(s=d[o])&&r.push(f[o]=s);v(null,d=[],r,i)}for(o=d.length;o--;)(s=d[o])&&-1<(r=v?W(e,s):a[o])&&(e[r]=!(t[r]=s))}}else d=_e(d===t?d.splice(c,d.length):d),v?v(null,t,d,i):H.apply(t,d)})}function xe(m,v){function e(e,t,n,i,r){var o,s,a,l=0,c="0",u=e&&[],f=[],d=w,p=e||b&&_.find.TAG("*",r),h=A+=null==d?1:Math.random()||.1,g=p.length;for(r&&(w=t===E||t||r);c!==g&&null!=(o=p[c]);c++){if(b&&o){for(s=0,t||o.ownerDocument===E||(x(o),n=!T);a=m[s++];)if(a(o,t||E,n)){i.push(o);break}r&&(A=h)}y&&((o=!a&&o)&&l--,e&&u.push(o))}if(l+=c,y&&c!==l){for(s=0;a=v[s++];)a(u,f,t,n);if(e){if(0<l)for(;c--;)u[c]||f[c]||(f[c]=N.call(i));f=_e(f)}H.apply(i,f),r&&!e&&0<f.length&&1<l+v.length&&ae.uniqueSort(i)}return r&&(A=h,w=d),u}var y=0<v.length,b=0<m.length;return y?ce(e):e}return me.prototype=_.filters=_.pseudos,_.setFilters=new me,p=ae.tokenize=function(e,t){var n,i,r,o,s,a,l,c=C[e+" "];if(c)return t?0:c.slice(0);for(s=e,a=[],l=_.preFilter;s;){for(o in n&&!(i=$.exec(s))||(i&&(s=s.slice(i[0].length)||s),a.push(r=[])),n=!1,(i=z.exec(s))&&(n=i.shift(),r.push({value:n,type:i[0].replace(B," ")}),s=s.slice(n.length)),_.filter)!(i=Q[o].exec(s))||l[o]&&!(i=l[o](i))||(n=i.shift(),r.push({value:n,type:o,matches:i}),s=s.slice(n.length));if(!n)break}return t?s.length:s?ae.error(e):C(e,a).slice(0)},h=ae.compile=function(e,t){var n,i=[],r=[],o=L[e+" "];if(!o){for(n=(t=t||p(e)).length;n--;)((o=function e(t){for(var i,n,r,o=t.length,s=_.relative[t[0].type],a=s||_.relative[" "],l=s?1:0,c=ye(function(e){return e===i},a,!0),u=ye(function(e){return-1<W(i,e)},a,!0),f=[function(e,t,n){return n=!s&&(n||t!==w)||((i=t).nodeType?c:u)(e,t,n),i=null,n}];l<o;l++)if(n=_.relative[t[l].type])f=[ye(be(f),n)];else{if((n=_.filter[t[l].type].apply(null,t[l].matches))[k]){for(r=++l;r<o&&!_.relative[t[r].type];r++);return we(1<l&&be(f),1<l&&ve(t.slice(0,l-1).concat({value:" "===t[l-2].type?"*":""})).replace(B,"$1"),n,l<r&&e(t.slice(l,r)),r<o&&e(t=t.slice(r)),r<o&&ve(t))}f.push(n)}return be(f)}(t[n]))[k]?i:r).push(o);(o=L(e,xe(r,i))).selector=e}return o},g=ae.select=function(e,t,n,i){var r,o,s,a,l,c="function"==typeof e&&e,u=!i&&p(e=c.selector||e);if(n=n||[],1===u.length){if(2<(o=u[0]=u[0].slice(0)).length&&"ID"===(s=o[0]).type&&9===t.nodeType&&T&&_.relative[o[1].type]){if(!(t=(_.find.ID(s.matches[0].replace(ie,f),t)||[])[0]))return n;c&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(r=Q.needsContext.test(e)?0:o.length;r--&&(s=o[r],!_.relative[a=s.type]);)if((l=_.find[a])&&(i=l(s.matches[0].replace(ie,f),ne.test(o[0].type)&&ge(t.parentNode)||t))){if(o.splice(r,1),!(e=i.length&&ve(o)))return H.apply(n,i),n;break}}return(c||h(e,u))(i,t,!T,n,!t||ne.test(e)&&ge(t.parentNode)||t),n},d.sortStable=k.split("").sort(j).join("")===k,d.detectDuplicates=!!c,x(),d.sortDetached=ue(function(e){return 1&e.compareDocumentPosition(E.createElement("fieldset"))}),ue(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ue(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ue(function(e){return null==e.getAttribute("disabled")})||fe(I,function(e,t,n){if(!n)return!0===e[t]?t.toLowerCase():(t=e.getAttributeNode(t))&&t.specified?t.value:null}),ae}(x);T.find=w,T.expr=w.selectors,T.expr[":"]=T.expr.pseudos,T.uniqueSort=T.unique=w.uniqueSort,T.text=w.getText,T.isXMLDoc=w.isXML,T.contains=w.contains,T.escapeSelector=w.escape;function k(e,t,n){for(var i=[],r=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(r&&T(e).is(n))break;i.push(e)}return i}function A(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}var S=T.expr.match.needsContext;function C(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var L=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function D(e,n,i){return b(n)?T.grep(e,function(e,t){return!!n.call(e,t,e)!==i}):n.nodeType?T.grep(e,function(e){return e===n!==i}):"string"!=typeof n?T.grep(e,function(e){return-1<r.call(n,e)!==i}):T.filter(n,e,i)}T.filter=function(e,t,n){var i=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===i.nodeType?T.find.matchesSelector(i,e)?[i]:[]:T.find.matches(e,T.grep(t,function(e){return 1===e.nodeType}))},T.fn.extend({find:function(e){var t,n,i=this.length,r=this;if("string"!=typeof e)return this.pushStack(T(e).filter(function(){for(t=0;t<i;t++)if(T.contains(r[t],this))return!0}));for(n=this.pushStack([]),t=0;t<i;t++)T.find(e,r[t],n);return 1<i?T.uniqueSort(n):n},filter:function(e){return this.pushStack(D(this,e||[],!1))},not:function(e){return this.pushStack(D(this,e||[],!0))},is:function(e){return!!D(this,"string"==typeof e&&S.test(e)?T(e):e||[],!1).length}});var j=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(T.fn.init=function(e,t,n){if(!e)return this;if(n=n||O,"string"!=typeof e)return e.nodeType?(this[0]=e,this.length=1,this):b(e)?void 0!==n.ready?n.ready(e):e(T):T.makeArray(e,this);if(!(i="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:j.exec(e))||!i[1]&&t)return(!t||t.jquery?t||n:this.constructor(t)).find(e);if(i[1]){if(t=t instanceof T?t[0]:t,T.merge(this,T.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),L.test(i[1])&&T.isPlainObject(t))for(var i in t)b(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}return(e=E.getElementById(i[2]))&&(this[0]=e,this.length=1),this}).prototype=T.fn;var O=T(E),N=/^(?:parents|prev(?:Until|All))/,P={children:!0,contents:!0,next:!0,prev:!0};function H(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}T.fn.extend({has:function(e){var t=T(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(T.contains(this,t[e]))return!0})},closest:function(e,t){var n,i=0,r=this.length,o=[],s="string"!=typeof e&&T(e);if(!S.test(e))for(;i<r;i++)for(n=this[i];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?-1<s.index(n):1===n.nodeType&&T.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?T.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?r.call(T(e),this[0]):r.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(T.uniqueSort(T.merge(this.get(),T(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),T.each({parent:function(e){e=e.parentNode;return e&&11!==e.nodeType?e:null},parents:function(e){return k(e,"parentNode")},parentsUntil:function(e,t,n){return k(e,"parentNode",n)},next:function(e){return H(e,"nextSibling")},prev:function(e){return H(e,"previousSibling")},nextAll:function(e){return k(e,"nextSibling")},prevAll:function(e){return k(e,"previousSibling")},nextUntil:function(e,t,n){return k(e,"nextSibling",n)},prevUntil:function(e,t,n){return k(e,"previousSibling",n)},siblings:function(e){return A((e.parentNode||{}).firstChild,e)},children:function(e){return A(e.firstChild)},contents:function(e){return void 0!==e.contentDocument?e.contentDocument:(C(e,"template")&&(e=e.content||e),T.merge([],e.childNodes))}},function(i,r){T.fn[i]=function(e,t){var n=T.map(this,r,e);return(t="Until"!==i.slice(-5)?e:t)&&"string"==typeof t&&(n=T.filter(t,n)),1<this.length&&(P[i]||T.uniqueSort(n),N.test(i)&&n.reverse()),this.pushStack(n)}});var R=/[^\x20\t\r\n\f]+/g;function W(e){return e}function I(e){throw e}function M(e,t,n,i){var r;try{e&&b(r=e.promise)?r.call(e).done(t).fail(n):e&&b(r=e.then)?r.call(e,t,n):t.apply(void 0,[e].slice(i))}catch(e){n.apply(void 0,[e])}}T.Callbacks=function(i){var e,n;i="string"==typeof i?(e=i,n={},T.each(e.match(R)||[],function(e,t){n[t]=!0}),n):T.extend({},i);function r(){for(a=a||i.once,s=o=!0;c.length;u=-1)for(t=c.shift();++u<l.length;)!1===l[u].apply(t[0],t[1])&&i.stopOnFalse&&(u=l.length,t=!1);i.memory||(t=!1),o=!1,a&&(l=t?[]:"")}var o,t,s,a,l=[],c=[],u=-1,f={add:function(){return l&&(t&&!o&&(u=l.length-1,c.push(t)),function n(e){T.each(e,function(e,t){b(t)?i.unique&&f.has(t)||l.push(t):t&&t.length&&"string"!==h(t)&&n(t)})}(arguments),t&&!o&&r()),this},remove:function(){return T.each(arguments,function(e,t){for(var n;-1<(n=T.inArray(t,l,n));)l.splice(n,1),n<=u&&u--}),this},has:function(e){return e?-1<T.inArray(e,l):0<l.length},empty:function(){return l=l&&[],this},disable:function(){return a=c=[],l=t="",this},disabled:function(){return!l},lock:function(){return a=c=[],t||o||(l=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],c.push(t),o||r()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!s}};return f},T.extend({Deferred:function(e){var o=[["notify","progress",T.Callbacks("memory"),T.Callbacks("memory"),2],["resolve","done",T.Callbacks("once memory"),T.Callbacks("once memory"),0,"resolved"],["reject","fail",T.Callbacks("once memory"),T.Callbacks("once memory"),1,"rejected"]],r="pending",s={state:function(){return r},always:function(){return a.done(arguments).fail(arguments),this},catch:function(e){return s.then(null,e)},pipe:function(){var r=arguments;return T.Deferred(function(i){T.each(o,function(e,t){var n=b(r[t[4]])&&r[t[4]];a[t[1]](function(){var e=n&&n.apply(this,arguments);e&&b(e.promise)?e.promise().progress(i.notify).done(i.resolve).fail(i.reject):i[t[0]+"With"](this,n?[e]:arguments)})}),r=null}).promise()},then:function(t,n,i){var l=0;function c(r,o,s,a){return function(){function e(){var e,t;if(!(r<l)){if((e=s.apply(n,i))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,b(t)?a?t.call(e,c(l,o,W,a),c(l,o,I,a)):(l++,t.call(e,c(l,o,W,a),c(l,o,I,a),c(l,o,W,o.notifyWith))):(s!==W&&(n=void 0,i=[e]),(a||o.resolveWith)(n,i))}}var n=this,i=arguments,t=a?e:function(){try{e()}catch(e){T.Deferred.exceptionHook&&T.Deferred.exceptionHook(e,t.stackTrace),l<=r+1&&(s!==I&&(n=void 0,i=[e]),o.rejectWith(n,i))}};r?t():(T.Deferred.getStackHook&&(t.stackTrace=T.Deferred.getStackHook()),x.setTimeout(t))}}return T.Deferred(function(e){o[0][3].add(c(0,e,b(i)?i:W,e.notifyWith)),o[1][3].add(c(0,e,b(t)?t:W)),o[2][3].add(c(0,e,b(n)?n:I))}).promise()},promise:function(e){return null!=e?T.extend(e,s):s}},a={};return T.each(o,function(e,t){var n=t[2],i=t[5];s[t[1]]=n.add,i&&n.add(function(){r=i},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),a[t[0]]=function(){return a[t[0]+"With"](this===a?void 0:this,arguments),this},a[t[0]+"With"]=n.fireWith}),s.promise(a),e&&e.call(a,a),a},when:function(e){function t(t){return function(e){r[t]=this,o[t]=1<arguments.length?a.call(arguments):e,--n||s.resolveWith(r,o)}}var n=arguments.length,i=n,r=Array(i),o=a.call(arguments),s=T.Deferred();if(n<=1&&(M(e,s.done(t(i)).resolve,s.reject,!n),"pending"===s.state()||b(o[i]&&o[i].then)))return s.then();for(;i--;)M(o[i],t(i),s.reject);return s.promise()}});var F=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;T.Deferred.exceptionHook=function(e,t){x.console&&x.console.warn&&e&&F.test(e.name)&&x.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},T.readyException=function(e){x.setTimeout(function(){throw e})};var q=T.Deferred();function Y(){E.removeEventListener("DOMContentLoaded",Y),x.removeEventListener("load",Y),T.ready()}T.fn.ready=function(e){return q.then(e).catch(function(e){T.readyException(e)}),this},T.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--T.readyWait:T.isReady)||(T.isReady=!0)!==e&&0<--T.readyWait||q.resolveWith(E,[T])}}),T.ready.then=q.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?x.setTimeout(T.ready):(E.addEventListener("DOMContentLoaded",Y),x.addEventListener("load",Y));var X=function(e,t,n,i,r,o,s){var a=0,l=e.length,c=null==n;if("object"===h(n))for(a in r=!0,n)X(e,t,a,n[a],!0,o,s);else if(void 0!==i&&(r=!0,b(i)||(s=!0),t=c?s?(t.call(e,i),null):(c=t,function(e,t,n){return c.call(T(e),n)}):t))for(;a<l;a++)t(e[a],n,s?i:i.call(e[a],a,t(e[a],n)));return r?e:c?t.call(e):l?t(e[0],n):o},B=/^-ms-/,$=/-([a-z])/g;function z(e,t){return t.toUpperCase()}function U(e){return e.replace(B,"ms-").replace($,z)}function K(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType}function V(){this.expando=T.expando+V.uid++}V.uid=1,V.prototype={cache:function(e){var t=e[this.expando];return t||(t={},K(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var i,r=this.cache(e);if("string"==typeof t)r[U(t)]=n;else for(i in t)r[U(i)]=t[i];return r},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][U(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,i=e[this.expando];if(void 0!==i){if(void 0!==t){n=(t=Array.isArray(t)?t.map(U):(t=U(t))in i?[t]:t.match(R)||[]).length;for(;n--;)delete i[t[n]]}void 0!==t&&!T.isEmptyObject(i)||(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){e=e[this.expando];return void 0!==e&&!T.isEmptyObject(e)}};var Q=new V,G=new V,Z=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,J=/[A-Z]/g;function ee(e,t,n){var i,r;if(void 0===n&&1===e.nodeType)if(i="data-"+t.replace(J,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(i))){try{n="true"===(r=n)||"false"!==r&&("null"===r?null:r===+r+""?+r:Z.test(r)?JSON.parse(r):r)}catch(e){}G.set(e,t,n)}else n=void 0;return n}T.extend({hasData:function(e){return G.hasData(e)||Q.hasData(e)},data:function(e,t,n){return G.access(e,t,n)},removeData:function(e,t){G.remove(e,t)},_data:function(e,t,n){return Q.access(e,t,n)},_removeData:function(e,t){Q.remove(e,t)}}),T.fn.extend({data:function(n,e){var t,i,r,o=this[0],s=o&&o.attributes;if(void 0!==n)return"object"==typeof n?this.each(function(){G.set(this,n)}):X(this,function(e){var t;return o&&void 0===e?void 0!==(t=G.get(o,n))||void 0!==(t=ee(o,n))?t:void 0:void this.each(function(){G.set(this,n,e)})},null,e,1<arguments.length,null,!0);if(this.length&&(r=G.get(o),1===o.nodeType&&!Q.get(o,"hasDataAttrs"))){for(t=s.length;t--;)s[t]&&0===(i=s[t].name).indexOf("data-")&&(i=U(i.slice(5)),ee(o,i,r[i]));Q.set(o,"hasDataAttrs",!0)}return r},removeData:function(e){return this.each(function(){G.remove(this,e)})}}),T.extend({queue:function(e,t,n){var i;if(e)return i=Q.get(e,t=(t||"fx")+"queue"),n&&(!i||Array.isArray(n)?i=Q.access(e,t,T.makeArray(n)):i.push(n)),i||[]},dequeue:function(e,t){var n=T.queue(e,t=t||"fx"),i=n.length,r=n.shift(),o=T._queueHooks(e,t);"inprogress"===r&&(r=n.shift(),i--),r&&("fx"===t&&n.unshift("inprogress"),delete o.stop,r.call(e,function(){T.dequeue(e,t)},o)),!i&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Q.get(e,n)||Q.access(e,n,{empty:T.Callbacks("once memory").add(function(){Q.remove(e,[t+"queue",n])})})}}),T.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?T.queue(this[0],t):void 0===n?this:this.each(function(){var e=T.queue(this,t,n);T._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&T.dequeue(this,t)})},dequeue:function(e){return this.each(function(){T.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){function n(){--r||o.resolveWith(s,[s])}var i,r=1,o=T.Deferred(),s=this,a=this.length;for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";a--;)(i=Q.get(s[a],e+"queueHooks"))&&i.empty&&(r++,i.empty.add(n));return n(),o.promise(t)}});var f=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,te=new RegExp("^(?:([+-])=|)("+f+")([a-z%]*)$","i"),ne=["Top","Right","Bottom","Left"],ie=E.documentElement,re=function(e){return T.contains(e.ownerDocument,e)},oe={composed:!0};ie.getRootNode&&(re=function(e){return T.contains(e.ownerDocument,e)||e.getRootNode(oe)===e.ownerDocument});function se(e,t,n,i){var r,o={};for(r in t)o[r]=e.style[r],e.style[r]=t[r];for(r in i=n.apply(e,i||[]),t)e.style[r]=o[r];return i}var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&re(e)&&"none"===T.css(e,"display")};function le(e,t,n,i){var r,o,s=20,a=i?function(){return i.cur()}:function(){return T.css(e,t,"")},l=a(),c=n&&n[3]||(T.cssNumber[t]?"":"px"),u=e.nodeType&&(T.cssNumber[t]||"px"!==c&&+l)&&te.exec(T.css(e,t));if(u&&u[3]!==c){for(c=c||u[3],u=+(l/=2)||1;s--;)T.style(e,t,u+c),(1-o)*(1-(o=a()/l||.5))<=0&&(s=0),u/=o;T.style(e,t,(u*=2)+c),n=n||[]}return n&&(u=+u||+l||0,r=n[1]?u+(n[1]+1)*n[2]:+n[2],i&&(i.unit=c,i.start=u,i.end=r)),r}var ce={};function ue(e,t){for(var n,i,r,o,s,a=[],l=0,c=e.length;l<c;l++)(i=e[l]).style&&(n=i.style.display,t?("none"===n&&(a[l]=Q.get(i,"display")||null,a[l]||(i.style.display="")),""===i.style.display&&ae(i)&&(a[l]=(s=o=void 0,o=(r=i).ownerDocument,s=r.nodeName,(r=ce[s])||(o=o.body.appendChild(o.createElement(s)),r=T.css(o,"display"),o.parentNode.removeChild(o),ce[s]=r="none"===r?"block":r)))):"none"!==n&&(a[l]="none",Q.set(i,"display",n)));for(l=0;l<c;l++)null!=a[l]&&(e[l].style.display=a[l]);return e}T.fn.extend({show:function(){return ue(this,!0)},hide:function(){return ue(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?T(this).show():T(this).hide()})}});var fe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,pe=/^$|^module$|\/(?:java|ecma)script/i,he={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ge(e,t){var n=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||"*"):void 0!==e.querySelectorAll?e.querySelectorAll(t||"*"):[];return void 0===t||t&&C(e,t)?T.merge([e],n):n}function me(e,t){for(var n=0,i=e.length;n<i;n++)Q.set(e[n],"globalEval",!t||Q.get(t[n],"globalEval"))}he.optgroup=he.option,he.tbody=he.tfoot=he.colgroup=he.caption=he.thead,he.th=he.td;var ve=/<|&#?\w+;/;function ye(e,t,n,i,r){for(var o,s,a,l,c,u=t.createDocumentFragment(),f=[],d=0,p=e.length;d<p;d++)if((o=e[d])||0===o)if("object"===h(o))T.merge(f,o.nodeType?[o]:o);else if(ve.test(o)){for(s=s||u.appendChild(t.createElement("div")),a=(de.exec(o)||["",""])[1].toLowerCase(),a=he[a]||he._default,s.innerHTML=a[1]+T.htmlPrefilter(o)+a[2],c=a[0];c--;)s=s.lastChild;T.merge(f,s.childNodes),(s=u.firstChild).textContent=""}else f.push(t.createTextNode(o));for(u.textContent="",d=0;o=f[d++];)if(i&&-1<T.inArray(o,i))r&&r.push(o);else if(l=re(o),s=ge(u.appendChild(o),"script"),l&&me(s),n)for(c=0;o=s[c++];)pe.test(o.type||"")&&n.push(o);return u}t=E.createDocumentFragment().appendChild(E.createElement("div")),(w=E.createElement("input")).setAttribute("type","radio"),w.setAttribute("checked","checked"),w.setAttribute("name","t"),t.appendChild(w),y.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue;var be=/^key/,_e=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,we=/^([^.]*)(?:\.(.+)|)/;function xe(){return!0}function Ee(){return!1}function Te(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function ke(e,t,n,i,r,o){var s,a;if("object"==typeof t){for(a in"string"!=typeof n&&(i=i||n,n=void 0),t)ke(e,a,n,i,t[a],o);return e}if(null==i&&null==r?(r=n,i=n=void 0):null==r&&("string"==typeof n?(r=i,i=void 0):(r=i,i=n,n=void 0)),!1===r)r=Ee;else if(!r)return e;return 1===o&&(s=r,(r=function(e){return T().off(e),s.apply(this,arguments)}).guid=s.guid||(s.guid=T.guid++)),e.each(function(){T.event.add(this,t,r,i,n)})}function Ae(e,r,o){o?(Q.set(e,r,!1),T.event.add(e,r,{namespace:!1,handler:function(e){var t,n,i=Q.get(this,r);if(1&e.isTrigger&&this[r]){if(i.length)(T.event.special[r]||{}).delegateType&&e.stopPropagation();else if(i=a.call(arguments),Q.set(this,r,i),t=o(this,r),this[r](),i!==(n=Q.get(this,r))||t?Q.set(this,r,!1):n={},i!==n)return e.stopImmediatePropagation(),e.preventDefault(),n.value}else i.length&&(Q.set(this,r,{value:T.event.trigger(T.extend(i[0],T.Event.prototype),i.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Q.get(e,r)&&T.event.add(e,r,xe)}T.event={global:{},add:function(t,e,n,i,r){var o,s,a,l,c,u,f,d,p,h=Q.get(t);if(h)for(n.handler&&(n=(o=n).handler,r=o.selector),r&&T.find.matchesSelector(ie,r),n.guid||(n.guid=T.guid++),(a=h.events)||(a=h.events={}),(s=h.handle)||(s=h.handle=function(e){return void 0!==T&&T.event.triggered!==e.type?T.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(R)||[""]).length;l--;)f=p=(c=we.exec(e[l])||[])[1],d=(c[2]||"").split(".").sort(),f&&(u=T.event.special[f]||{},f=(r?u.delegateType:u.bindType)||f,u=T.event.special[f]||{},c=T.extend({type:f,origType:p,data:i,handler:n,guid:n.guid,selector:r,needsContext:r&&T.expr.match.needsContext.test(r),namespace:d.join(".")},o),(p=a[f])||((p=a[f]=[]).delegateCount=0,u.setup&&!1!==u.setup.call(t,i,d,s)||t.addEventListener&&t.addEventListener(f,s)),u.add&&(u.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),r?p.splice(p.delegateCount++,0,c):p.push(c),T.event.global[f]=!0)},remove:function(e,t,n,i,r){var o,s,a,l,c,u,f,d,p,h,g,m=Q.hasData(e)&&Q.get(e);if(m&&(l=m.events)){for(c=(t=(t||"").match(R)||[""]).length;c--;)if(p=g=(a=we.exec(t[c])||[])[1],h=(a[2]||"").split(".").sort(),p){for(f=T.event.special[p]||{},d=l[p=(i?f.delegateType:f.bindType)||p]||[],a=a[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=d.length;o--;)u=d[o],!r&&g!==u.origType||n&&n.guid!==u.guid||a&&!a.test(u.namespace)||i&&i!==u.selector&&("**"!==i||!u.selector)||(d.splice(o,1),u.selector&&d.delegateCount--,f.remove&&f.remove.call(e,u));s&&!d.length&&(f.teardown&&!1!==f.teardown.call(e,h,m.handle)||T.removeEvent(e,p,m.handle),delete l[p])}else for(p in l)T.event.remove(e,p+t[c],n,i,!0);T.isEmptyObject(l)&&Q.remove(e,"handle events")}},dispatch:function(e){var t,n,i,r,o,s=T.event.fix(e),a=new Array(arguments.length),l=(Q.get(this,"events")||{})[s.type]||[],e=T.event.special[s.type]||{};for(a[0]=s,t=1;t<arguments.length;t++)a[t]=arguments[t];if(s.delegateTarget=this,!e.preDispatch||!1!==e.preDispatch.call(this,s)){for(o=T.event.handlers.call(this,s,l),t=0;(i=o[t++])&&!s.isPropagationStopped();)for(s.currentTarget=i.elem,n=0;(r=i.handlers[n++])&&!s.isImmediatePropagationStopped();)s.rnamespace&&!1!==r.namespace&&!s.rnamespace.test(r.namespace)||(s.handleObj=r,s.data=r.data,void 0!==(r=((T.event.special[r.origType]||{}).handle||r.handler).apply(i.elem,a))&&!1===(s.result=r)&&(s.preventDefault(),s.stopPropagation()));return e.postDispatch&&e.postDispatch.call(this,s),s.result}},handlers:function(e,t){var n,i,r,o,s,a=[],l=t.delegateCount,c=e.target;if(l&&c.nodeType&&!("click"===e.type&&1<=e.button))for(;c!==this;c=c.parentNode||this)if(1===c.nodeType&&("click"!==e.type||!0!==c.disabled)){for(o=[],s={},n=0;n<l;n++)void 0===s[r=(i=t[n]).selector+" "]&&(s[r]=i.needsContext?-1<T(r,this).index(c):T.find(r,this,null,[c]).length),s[r]&&o.push(i);o.length&&a.push({elem:c,handlers:o})}return c=this,l<t.length&&a.push({elem:c,handlers:t.slice(l)}),a},addProp:function(t,e){Object.defineProperty(T.Event.prototype,t,{enumerable:!0,configurable:!0,get:b(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[T.expando]?e:new T.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){e=this||e;return fe.test(e.type)&&e.click&&C(e,"input")&&Ae(e,"click",xe),!1},trigger:function(e){e=this||e;return fe.test(e.type)&&e.click&&C(e,"input")&&Ae(e,"click"),!0},_default:function(e){e=e.target;return fe.test(e.type)&&e.click&&C(e,"input")&&Q.get(e,"click")||C(e,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},T.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},T.Event=function(e,t){if(!(this instanceof T.Event))return new T.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?xe:Ee,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&T.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[T.expando]=!0},T.Event.prototype={constructor:T.Event,isDefaultPrevented:Ee,isPropagationStopped:Ee,isImmediatePropagationStopped:Ee,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=xe,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=xe,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=xe,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},T.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&be.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&_e.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},T.event.addProp),T.each({focus:"focusin",blur:"focusout"},function(e,t){T.event.special[e]={setup:function(){return Ae(this,e,Te),!1},trigger:function(){return Ae(this,e),!0},delegateType:t}}),T.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,r){T.event.special[e]={delegateType:r,bindType:r,handle:function(e){var t,n=e.relatedTarget,i=e.handleObj;return n&&(n===this||T.contains(this,n))||(e.type=i.origType,t=i.handler.apply(this,arguments),e.type=r),t}}}),T.fn.extend({on:function(e,t,n,i){return ke(this,e,t,n,i)},one:function(e,t,n,i){return ke(this,e,t,n,i,1)},off:function(e,t,n){var i,r;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,T(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"!=typeof e)return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Ee),this.each(function(){T.event.remove(this,e,n,t)});for(r in e)this.off(r,t,e[r]);return this}});var Se=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Ce=/<script|<style|<link/i,Le=/checked\s*(?:[^=]|=\s*.checked.)/i,De=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function je(e,t){return C(e,"table")&&C(11!==t.nodeType?t:t.firstChild,"tr")&&T(e).children("tbody")[0]||e}function Oe(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Ne(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Pe(e,t){var n,i,r,o,s,a;if(1===t.nodeType){if(Q.hasData(e)&&(o=Q.access(e),s=Q.set(t,o),a=o.events))for(r in delete s.handle,s.events={},a)for(n=0,i=a[r].length;n<i;n++)T.event.add(t,r,a[r][n]);G.hasData(e)&&(e=G.access(e),e=T.extend({},e),G.set(t,e))}}function He(n,i,r,o){i=m.apply([],i);var e,t,s,a,l,c,u=0,f=n.length,d=f-1,p=i[0],h=b(p);if(h||1<f&&"string"==typeof p&&!y.checkClone&&Le.test(p))return n.each(function(e){var t=n.eq(e);h&&(i[0]=p.call(this,e,t.html())),He(t,i,r,o)});if(f&&(t=(e=ye(i,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(a=(s=T.map(ge(e,"script"),Oe)).length;u<f;u++)l=e,u!==d&&(l=T.clone(l,!0,!0),a&&T.merge(s,ge(l,"script"))),r.call(n[u],l,u);if(a)for(c=s[s.length-1].ownerDocument,T.map(s,Ne),u=0;u<a;u++)l=s[u],pe.test(l.type||"")&&!Q.access(l,"globalEval")&&T.contains(c,l)&&(l.src&&"module"!==(l.type||"").toLowerCase()?T._evalUrl&&!l.noModule&&T._evalUrl(l.src,{nonce:l.nonce||l.getAttribute("nonce")}):_(l.textContent.replace(De,""),l,c))}return n}function Re(e,t,n){for(var i,r=t?T.filter(t,e):e,o=0;null!=(i=r[o]);o++)n||1!==i.nodeType||T.cleanData(ge(i)),i.parentNode&&(n&&re(i)&&me(ge(i,"script")),i.parentNode.removeChild(i));return e}T.extend({htmlPrefilter:function(e){return e.replace(Se,"<$1></$2>")},clone:function(e,t,n){var i,r,o,s,a,l,c,u=e.cloneNode(!0),f=re(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||T.isXMLDoc(e)))for(s=ge(u),i=0,r=(o=ge(e)).length;i<r;i++)a=o[i],l=s[i],c=void 0,"input"===(c=l.nodeName.toLowerCase())&&fe.test(a.type)?l.checked=a.checked:"input"!==c&&"textarea"!==c||(l.defaultValue=a.defaultValue);if(t)if(n)for(o=o||ge(e),s=s||ge(u),i=0,r=o.length;i<r;i++)Pe(o[i],s[i]);else Pe(e,u);return 0<(s=ge(u,"script")).length&&me(s,!f&&ge(e,"script")),u},cleanData:function(e){for(var t,n,i,r=T.event.special,o=0;void 0!==(n=e[o]);o++)if(K(n)){if(t=n[Q.expando]){if(t.events)for(i in t.events)r[i]?T.event.remove(n,i):T.removeEvent(n,i,t.handle);n[Q.expando]=void 0}n[G.expando]&&(n[G.expando]=void 0)}}}),T.fn.extend({detach:function(e){return Re(this,e,!0)},remove:function(e){return Re(this,e)},text:function(e){return X(this,function(e){return void 0===e?T.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return He(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||je(this,e).appendChild(e)})},prepend:function(){return He(this,arguments,function(e){var t;1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(t=je(this,e)).insertBefore(e,t.firstChild)})},before:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return He(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(T.cleanData(ge(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return T.clone(this,e,t)})},html:function(e){return X(this,function(e){var t=this[0]||{},n=0,i=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ce.test(e)&&!he[(de.exec(e)||["",""])[1].toLowerCase()]){e=T.htmlPrefilter(e);try{for(;n<i;n++)1===(t=this[n]||{}).nodeType&&(T.cleanData(ge(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return He(this,arguments,function(e){var t=this.parentNode;T.inArray(this,n)<0&&(T.cleanData(ge(this)),t&&t.replaceChild(e,this))},n)}}),T.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,s){T.fn[e]=function(e){for(var t,n=[],i=T(e),r=i.length-1,o=0;o<=r;o++)t=o===r?this:this.clone(!0),T(i[o])[s](t),l.apply(n,t.get());return this.pushStack(n)}});var We,Ie,Me,Fe,qe,Ye,Xe,Be=new RegExp("^("+f+")(?!px)[a-z%]+$","i"),$e=function(e){var t=e.ownerDocument.defaultView;return(t=!t||!t.opener?x:t).getComputedStyle(e)},ze=new RegExp(ne.join("|"),"i");function Ue(){var e;Xe&&(Ye.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",Xe.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ie.appendChild(Ye).appendChild(Xe),e=x.getComputedStyle(Xe),We="1%"!==e.top,qe=12===Ke(e.marginLeft),Xe.style.right="60%",Fe=36===Ke(e.right),Ie=36===Ke(e.width),Xe.style.position="absolute",Me=12===Ke(Xe.offsetWidth/3),ie.removeChild(Ye),Xe=null)}function Ke(e){return Math.round(parseFloat(e))}function Ve(e,t,n){var i,r,o=e.style;return(n=n||$e(e))&&(""!==(r=n.getPropertyValue(t)||n[t])||re(e)||(r=T.style(e,t)),!y.pixelBoxStyles()&&Be.test(r)&&ze.test(t)&&(i=o.width,e=o.minWidth,t=o.maxWidth,o.minWidth=o.maxWidth=o.width=r,r=n.width,o.width=i,o.minWidth=e,o.maxWidth=t)),void 0!==r?r+"":r}function Qe(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}Ye=E.createElement("div"),(Xe=E.createElement("div")).style&&(Xe.style.backgroundClip="content-box",Xe.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===Xe.style.backgroundClip,T.extend(y,{boxSizingReliable:function(){return Ue(),Ie},pixelBoxStyles:function(){return Ue(),Fe},pixelPosition:function(){return Ue(),We},reliableMarginLeft:function(){return Ue(),qe},scrollboxSize:function(){return Ue(),Me}}));var Ge=["Webkit","Moz","ms"],Ze=E.createElement("div").style,Je={};function et(e){var t=T.cssProps[e]||Je[e];return t||(e in Ze?e:Je[e]=function(e){for(var t=e[0].toUpperCase()+e.slice(1),n=Ge.length;n--;)if((e=Ge[n]+t)in Ze)return e}(e)||e)}var tt=/^(none|table(?!-c[ea]).+)/,nt=/^--/,it={position:"absolute",visibility:"hidden",display:"block"},rt={letterSpacing:"0",fontWeight:"400"};function ot(e,t,n){var i=te.exec(t);return i?Math.max(0,i[2]-(n||0))+(i[3]||"px"):t}function st(e,t,n,i,r,o){var s="width"===t?1:0,a=0,l=0;if(n===(i?"border":"content"))return 0;for(;s<4;s+=2)"margin"===n&&(l+=T.css(e,n+ne[s],!0,r)),i?("content"===n&&(l-=T.css(e,"padding"+ne[s],!0,r)),"margin"!==n&&(l-=T.css(e,"border"+ne[s]+"Width",!0,r))):(l+=T.css(e,"padding"+ne[s],!0,r),"padding"!==n?l+=T.css(e,"border"+ne[s]+"Width",!0,r):a+=T.css(e,"border"+ne[s]+"Width",!0,r));return!i&&0<=o&&(l+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-l-a-.5))||0),l}function at(e,t,n){var i=$e(e),r=(!y.boxSizingReliable()||n)&&"border-box"===T.css(e,"boxSizing",!1,i),o=r,s=Ve(e,t,i),a="offset"+t[0].toUpperCase()+t.slice(1);if(Be.test(s)){if(!n)return s;s="auto"}return(!y.boxSizingReliable()&&r||"auto"===s||!parseFloat(s)&&"inline"===T.css(e,"display",!1,i))&&e.getClientRects().length&&(r="border-box"===T.css(e,"boxSizing",!1,i),(o=a in e)&&(s=e[a])),(s=parseFloat(s)||0)+st(e,t,n||(r?"border":"content"),o,i,s)+"px"}function lt(e,t,n,i,r){return new lt.prototype.init(e,t,n,i,r)}T.extend({cssHooks:{opacity:{get:function(e,t){if(t){e=Ve(e,"opacity");return""===e?"1":e}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var r,o,s,a=U(t),l=nt.test(t),c=e.style;if(l||(t=et(a)),s=T.cssHooks[t]||T.cssHooks[a],void 0===n)return s&&"get"in s&&void 0!==(r=s.get(e,!1,i))?r:c[t];"string"===(o=typeof n)&&(r=te.exec(n))&&r[1]&&(n=le(e,t,r),o="number"),null!=n&&n==n&&("number"!==o||l||(n+=r&&r[3]||(T.cssNumber[a]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(c[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,i))||(l?c.setProperty(t,n):c[t]=n))}},css:function(e,t,n,i){var r,o=U(t);return nt.test(t)||(t=et(o)),"normal"===(r=void 0===(r=(o=T.cssHooks[t]||T.cssHooks[o])&&"get"in o?o.get(e,!0,n):r)?Ve(e,t,i):r)&&t in rt&&(r=rt[t]),""===n||n?(t=parseFloat(r),!0===n||isFinite(t)?t||0:r):r}}),T.each(["height","width"],function(e,a){T.cssHooks[a]={get:function(e,t,n){if(t)return!tt.test(T.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?at(e,a,n):se(e,it,function(){return at(e,a,n)})},set:function(e,t,n){var i,r=$e(e),o=!y.scrollboxSize()&&"absolute"===r.position,s=(o||n)&&"border-box"===T.css(e,"boxSizing",!1,r),n=n?st(e,a,n,s,r):0;return s&&o&&(n-=Math.ceil(e["offset"+a[0].toUpperCase()+a.slice(1)]-parseFloat(r[a])-st(e,a,"border",!1,r)-.5)),n&&(i=te.exec(t))&&"px"!==(i[3]||"px")&&(e.style[a]=t,t=T.css(e,a)),ot(0,t,n)}}}),T.cssHooks.marginLeft=Qe(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Ve(e,"marginLeft"))||e.getBoundingClientRect().left-se(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),T.each({margin:"",padding:"",border:"Width"},function(r,o){T.cssHooks[r+o]={expand:function(e){for(var t=0,n={},i="string"==typeof e?e.split(" "):[e];t<4;t++)n[r+ne[t]+o]=i[t]||i[t-2]||i[0];return n}},"margin"!==r&&(T.cssHooks[r+o].set=ot)}),T.fn.extend({css:function(e,t){return X(this,function(e,t,n){var i,r,o={},s=0;if(Array.isArray(t)){for(i=$e(e),r=t.length;s<r;s++)o[t[s]]=T.css(e,t[s],!1,i);return o}return void 0!==n?T.style(e,t,n):T.css(e,t)},e,t,1<arguments.length)}}),(T.Tween=lt).prototype={constructor:lt,init:function(e,t,n,i,r,o){this.elem=e,this.prop=n,this.easing=r||T.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=i,this.unit=o||(T.cssNumber[n]?"":"px")},cur:function(){var e=lt.propHooks[this.prop];return(e&&e.get?e:lt.propHooks._default).get(this)},run:function(e){var t,n=lt.propHooks[this.prop];return this.options.duration?this.pos=t=T.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),(n&&n.set?n:lt.propHooks._default).set(this),this}},lt.prototype.init.prototype=lt.prototype,lt.propHooks={_default:{get:function(e){return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(e=T.css(e.elem,e.prop,""))&&"auto"!==e?e:0},set:function(e){T.fx.step[e.prop]?T.fx.step[e.prop](e):1!==e.elem.nodeType||!T.cssHooks[e.prop]&&null==e.elem.style[et(e.prop)]?e.elem[e.prop]=e.now:T.style(e.elem,e.prop,e.now+e.unit)}}},lt.propHooks.scrollTop=lt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},T.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},T.fx=lt.prototype.init,T.fx.step={};var ct,ut,ft=/^(?:toggle|show|hide)$/,dt=/queueHooks$/;function pt(){ut&&(!1===E.hidden&&x.requestAnimationFrame?x.requestAnimationFrame(pt):x.setTimeout(pt,T.fx.interval),T.fx.tick())}function ht(){return x.setTimeout(function(){ct=void 0}),ct=Date.now()}function gt(e,t){var n,i=0,r={height:e};for(t=t?1:0;i<4;i+=2-t)r["margin"+(n=ne[i])]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function mt(e,t,n){for(var i,r=(vt.tweeners[t]||[]).concat(vt.tweeners["*"]),o=0,s=r.length;o<s;o++)if(i=r[o].call(n,t,e))return i}function vt(r,e,t){var n,o,i=0,s=vt.prefilters.length,a=T.Deferred().always(function(){delete l.elem}),l=function(){if(o)return!1;for(var e=ct||ht(),e=Math.max(0,c.startTime+c.duration-e),t=1-(e/c.duration||0),n=0,i=c.tweens.length;n<i;n++)c.tweens[n].run(t);return a.notifyWith(r,[c,t,e]),t<1&&i?e:(i||a.notifyWith(r,[c,1,0]),a.resolveWith(r,[c]),!1)},c=a.promise({elem:r,props:T.extend({},e),opts:T.extend(!0,{specialEasing:{},easing:T.easing._default},t),originalProperties:e,originalOptions:t,startTime:ct||ht(),duration:t.duration,tweens:[],createTween:function(e,t){e=T.Tween(r,c.opts,e,t,c.opts.specialEasing[e]||c.opts.easing);return c.tweens.push(e),e},stop:function(e){var t=0,n=e?c.tweens.length:0;if(o)return this;for(o=!0;t<n;t++)c.tweens[t].run(1);return e?(a.notifyWith(r,[c,1,0]),a.resolveWith(r,[c,e])):a.rejectWith(r,[c,e]),this}}),u=c.props;for(!function(e,t){var n,i,r,o,s;for(n in e)if(r=t[i=U(n)],o=e[n],Array.isArray(o)&&(r=o[1],o=e[n]=o[0]),n!==i&&(e[i]=o,delete e[n]),(s=T.cssHooks[i])&&"expand"in s)for(n in o=s.expand(o),delete e[i],o)n in e||(e[n]=o[n],t[n]=r);else t[i]=r}(u,c.opts.specialEasing);i<s;i++)if(n=vt.prefilters[i].call(c,r,u,c.opts))return b(n.stop)&&(T._queueHooks(c.elem,c.opts.queue).stop=n.stop.bind(n)),n;return T.map(u,mt,c),b(c.opts.start)&&c.opts.start.call(r,c),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always),T.fx.timer(T.extend(l,{elem:r,anim:c,queue:c.opts.queue})),c}T.Animation=T.extend(vt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return le(n.elem,e,te.exec(t),n),n}]},tweener:function(e,t){for(var n,i=0,r=(e=b(e)?(t=e,["*"]):e.match(R)).length;i<r;i++)n=e[i],vt.tweeners[n]=vt.tweeners[n]||[],vt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var i,r,o,s,a,l,c,u="width"in t||"height"in t,f=this,d={},p=e.style,h=e.nodeType&&ae(e),g=Q.get(e,"fxshow");for(i in n.queue||(null==(s=T._queueHooks(e,"fx")).unqueued&&(s.unqueued=0,a=s.empty.fire,s.empty.fire=function(){s.unqueued||a()}),s.unqueued++,f.always(function(){f.always(function(){s.unqueued--,T.queue(e,"fx").length||s.empty.fire()})})),t)if(r=t[i],ft.test(r)){if(delete t[i],o=o||"toggle"===r,r===(h?"hide":"show")){if("show"!==r||!g||void 0===g[i])continue;h=!0}d[i]=g&&g[i]||T.style(e,i)}if((l=!T.isEmptyObject(t))||!T.isEmptyObject(d))for(i in u&&1===e.nodeType&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],null==(c=g&&g.display)&&(c=Q.get(e,"display")),"none"===(u=T.css(e,"display"))&&(c?u=c:(ue([e],!0),c=e.style.display||c,u=T.css(e,"display"),ue([e]))),("inline"===u||"inline-block"===u&&null!=c)&&"none"===T.css(e,"float")&&(l||(f.done(function(){p.display=c}),null==c&&(u=p.display,c="none"===u?"":u)),p.display="inline-block")),n.overflow&&(p.overflow="hidden",f.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]})),l=!1,d)l||(g?"hidden"in g&&(h=g.hidden):g=Q.access(e,"fxshow",{display:c}),o&&(g.hidden=!h),h&&ue([e],!0),f.done(function(){for(i in h||ue([e]),Q.remove(e,"fxshow"),d)T.style(e,i,d[i])})),l=mt(h?g[i]:0,i,f),i in g||(g[i]=l.start,h&&(l.end=l.start,l.start=0))}],prefilter:function(e,t){t?vt.prefilters.unshift(e):vt.prefilters.push(e)}}),T.speed=function(e,t,n){var i=e&&"object"==typeof e?T.extend({},e):{complete:n||!n&&t||b(e)&&e,duration:e,easing:n&&t||t&&!b(t)&&t};return T.fx.off?i.duration=0:"number"!=typeof i.duration&&(i.duration in T.fx.speeds?i.duration=T.fx.speeds[i.duration]:i.duration=T.fx.speeds._default),null!=i.queue&&!0!==i.queue||(i.queue="fx"),i.old=i.complete,i.complete=function(){b(i.old)&&i.old.call(this),i.queue&&T.dequeue(this,i.queue)},i},T.fn.extend({fadeTo:function(e,t,n,i){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,i)},animate:function(t,e,n,i){var r=T.isEmptyObject(t),o=T.speed(e,n,i),i=function(){var e=vt(this,T.extend({},t),o);(r||Q.get(this,"finish"))&&e.stop(!0)};return i.finish=i,r||!1===o.queue?this.each(i):this.queue(o.queue,i)},stop:function(r,e,o){function s(e){var t=e.stop;delete e.stop,t(o)}return"string"!=typeof r&&(o=e,e=r,r=void 0),e&&!1!==r&&this.queue(r||"fx",[]),this.each(function(){var e=!0,t=null!=r&&r+"queueHooks",n=T.timers,i=Q.get(this);if(t)i[t]&&i[t].stop&&s(i[t]);else for(t in i)i[t]&&i[t].stop&&dt.test(t)&&s(i[t]);for(t=n.length;t--;)n[t].elem!==this||null!=r&&n[t].queue!==r||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||T.dequeue(this,r)})},finish:function(s){return!1!==s&&(s=s||"fx"),this.each(function(){var e,t=Q.get(this),n=t[s+"queue"],i=t[s+"queueHooks"],r=T.timers,o=n?n.length:0;for(t.finish=!0,T.queue(this,s,[]),i&&i.stop&&i.stop.call(this,!0),e=r.length;e--;)r[e].elem===this&&r[e].queue===s&&(r[e].anim.stop(!0),r.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),T.each(["toggle","show","hide"],function(e,i){var r=T.fn[i];T.fn[i]=function(e,t,n){return null==e||"boolean"==typeof e?r.apply(this,arguments):this.animate(gt(i,!0),e,t,n)}}),T.each({slideDown:gt("show"),slideUp:gt("hide"),slideToggle:gt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,i){T.fn[e]=function(e,t,n){return this.animate(i,e,t,n)}}),T.timers=[],T.fx.tick=function(){var e,t=0,n=T.timers;for(ct=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||T.fx.stop(),ct=void 0},T.fx.timer=function(e){T.timers.push(e),T.fx.start()},T.fx.interval=13,T.fx.start=function(){ut||(ut=!0,pt())},T.fx.stop=function(){ut=null},T.fx.speeds={slow:600,fast:200,_default:400},T.fn.delay=function(i,e){return i=T.fx&&T.fx.speeds[i]||i,this.queue(e=e||"fx",function(e,t){var n=x.setTimeout(e,i);t.stop=function(){x.clearTimeout(n)}})},t=E.createElement("input"),f=E.createElement("select").appendChild(E.createElement("option")),t.type="checkbox",y.checkOn=""!==t.value,y.optSelected=f.selected,(t=E.createElement("input")).value="t",t.type="radio",y.radioValue="t"===t.value;var yt,bt=T.expr.attrHandle;T.fn.extend({attr:function(e,t){return X(this,T.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){T.removeAttr(this,e)})}}),T.extend({attr:function(e,t,n){var i,r,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return void 0===e.getAttribute?T.prop(e,t,n):(1===o&&T.isXMLDoc(e)||(r=T.attrHooks[t.toLowerCase()]||(T.expr.match.bool.test(t)?yt:void 0)),void 0!==n?null===n?void T.removeAttr(e,t):r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):!(r&&"get"in r&&null!==(i=r.get(e,t)))&&null==(i=T.find.attr(e,t))?void 0:i)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&C(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,i=0,r=t&&t.match(R);if(r&&1===e.nodeType)for(;n=r[i++];)e.removeAttribute(n)}}),yt={set:function(e,t,n){return!1===t?T.removeAttr(e,n):e.setAttribute(n,n),n}},T.each(T.expr.match.bool.source.match(/\w+/g),function(e,t){var s=bt[t]||T.find.attr;bt[t]=function(e,t,n){var i,r,o=t.toLowerCase();return n||(r=bt[o],bt[o]=i,i=null!=s(e,t,n)?o:null,bt[o]=r),i}});var _t=/^(?:input|select|textarea|button)$/i,wt=/^(?:a|area)$/i;function xt(e){return(e.match(R)||[]).join(" ")}function Et(e){return e.getAttribute&&e.getAttribute("class")||""}function Tt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(R)||[]}T.fn.extend({prop:function(e,t){return X(this,T.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[T.propFix[e]||e]})}}),T.extend({prop:function(e,t,n){var i,r,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&T.isXMLDoc(e)||(t=T.propFix[t]||t,r=T.propHooks[t]),void 0!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:e[t]=n:r&&"get"in r&&null!==(i=r.get(e,t))?i:e[t]},propHooks:{tabIndex:{get:function(e){var t=T.find.attr(e,"tabindex");return t?parseInt(t,10):_t.test(e.nodeName)||wt.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),y.optSelected||(T.propHooks.selected={get:function(e){e=e.parentNode;return e&&e.parentNode&&e.parentNode.selectedIndex,null},set:function(e){e=e.parentNode;e&&(e.selectedIndex,e.parentNode&&e.parentNode.selectedIndex)}}),T.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){T.propFix[this.toLowerCase()]=this}),T.fn.extend({addClass:function(t){var e,n,i,r,o,s,a=0;if(b(t))return this.each(function(e){T(this).addClass(t.call(this,e,Et(this)))});if((e=Tt(t)).length)for(;n=this[a++];)if(s=Et(n),i=1===n.nodeType&&" "+xt(s)+" "){for(o=0;r=e[o++];)i.indexOf(" "+r+" ")<0&&(i+=r+" ");s!==(s=xt(i))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,i,r,o,s,a=0;if(b(t))return this.each(function(e){T(this).removeClass(t.call(this,e,Et(this)))});if(!arguments.length)return this.attr("class","");if((e=Tt(t)).length)for(;n=this[a++];)if(s=Et(n),i=1===n.nodeType&&" "+xt(s)+" "){for(o=0;r=e[o++];)for(;-1<i.indexOf(" "+r+" ");)i=i.replace(" "+r+" "," ");s!==(s=xt(i))&&n.setAttribute("class",s)}return this},toggleClass:function(r,t){var o=typeof r,s="string"==o||Array.isArray(r);return"boolean"==typeof t&&s?t?this.addClass(r):this.removeClass(r):b(r)?this.each(function(e){T(this).toggleClass(r.call(this,e,Et(this),t),t)}):this.each(function(){var e,t,n,i;if(s)for(t=0,n=T(this),i=Tt(r);e=i[t++];)n.hasClass(e)?n.removeClass(e):n.addClass(e);else void 0!==r&&"boolean"!=o||((e=Et(this))&&Q.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",!e&&!1!==r&&Q.get(this,"__className__")||""))})},hasClass:function(e){for(var t,n=0,i=" "+e+" ";t=this[n++];)if(1===t.nodeType&&-1<(" "+xt(Et(t))+" ").indexOf(i))return!0;return!1}});var kt=/\r/g;T.fn.extend({val:function(t){var n,e,i,r=this[0];return arguments.length?(i=b(t),this.each(function(e){1===this.nodeType&&(null==(e=i?t.call(this,e,T(this).val()):t)?e="":"number"==typeof e?e+="":Array.isArray(e)&&(e=T.map(e,function(e){return null==e?"":e+""})),(n=T.valHooks[this.type]||T.valHooks[this.nodeName.toLowerCase()])&&"set"in n&&void 0!==n.set(this,e,"value")||(this.value=e))})):r?(n=T.valHooks[r.type]||T.valHooks[r.nodeName.toLowerCase()])&&"get"in n&&void 0!==(e=n.get(r,"value"))?e:"string"==typeof(e=r.value)?e.replace(kt,""):null==e?"":e:void 0}}),T.extend({valHooks:{option:{get:function(e){var t=T.find.attr(e,"value");return null!=t?t:xt(T.text(e))}},select:{get:function(e){for(var t,n=e.options,i=e.selectedIndex,r="select-one"===e.type,o=r?null:[],s=r?i+1:n.length,a=i<0?s:r?i:0;a<s;a++)if(((t=n[a]).selected||a===i)&&!t.disabled&&(!t.parentNode.disabled||!C(t.parentNode,"optgroup"))){if(t=T(t).val(),r)return t;o.push(t)}return o},set:function(e,t){for(var n,i,r=e.options,o=T.makeArray(t),s=r.length;s--;)((i=r[s]).selected=-1<T.inArray(T.valHooks.option.get(i),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),T.each(["radio","checkbox"],function(){T.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<T.inArray(T(e).val(),t)}},y.checkOn||(T.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in x;function At(e){e.stopPropagation()}var St=/^(?:focusinfocus|focusoutblur)$/;T.extend(T.event,{trigger:function(e,t,n,i){var r,o,s,a,l,c,u,f=[n||E],d=v.call(e,"type")?e.type:e,p=v.call(e,"namespace")?e.namespace.split("."):[],h=u=o=n=n||E;if(3!==n.nodeType&&8!==n.nodeType&&!St.test(d+T.event.triggered)&&(-1<d.indexOf(".")&&(d=(p=d.split(".")).shift(),p.sort()),a=d.indexOf(":")<0&&"on"+d,(e=e[T.expando]?e:new T.Event(d,"object"==typeof e&&e)).isTrigger=i?2:3,e.namespace=p.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:T.makeArray(t,[e]),c=T.event.special[d]||{},i||!c.trigger||!1!==c.trigger.apply(n,t))){if(!i&&!c.noBubble&&!g(n)){for(s=c.delegateType||d,St.test(s+d)||(h=h.parentNode);h;h=h.parentNode)f.push(h),o=h;o===(n.ownerDocument||E)&&f.push(o.defaultView||o.parentWindow||x)}for(r=0;(h=f[r++])&&!e.isPropagationStopped();)u=h,e.type=1<r?s:c.bindType||d,(l=(Q.get(h,"events")||{})[e.type]&&Q.get(h,"handle"))&&l.apply(h,t),(l=a&&h[a])&&l.apply&&K(h)&&(e.result=l.apply(h,t),!1===e.result&&e.preventDefault());return e.type=d,i||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(f.pop(),t)||!K(n)||a&&b(n[d])&&!g(n)&&((o=n[a])&&(n[a]=null),T.event.triggered=d,e.isPropagationStopped()&&u.addEventListener(d,At),n[d](),e.isPropagationStopped()&&u.removeEventListener(d,At),T.event.triggered=void 0,o&&(n[a]=o)),e.result}},simulate:function(e,t,n){e=T.extend(new T.Event,n,{type:e,isSimulated:!0});T.event.trigger(e,null,t)}}),T.fn.extend({trigger:function(e,t){return this.each(function(){T.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return T.event.trigger(e,t,n,!0)}}),y.focusin||T.each({focus:"focusin",blur:"focusout"},function(n,i){function r(e){T.event.simulate(i,e.target,T.event.fix(e))}T.event.special[i]={setup:function(){var e=this.ownerDocument||this,t=Q.access(e,i);t||e.addEventListener(n,r,!0),Q.access(e,i,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this,t=Q.access(e,i)-1;t?Q.access(e,i,t):(e.removeEventListener(n,r,!0),Q.remove(e,i))}}});var Ct=x.location,Lt=Date.now(),Dt=/\?/;T.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new x.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||T.error("Invalid XML: "+e),t};var jt=/\[\]$/,Ot=/\r?\n/g,Nt=/^(?:submit|button|image|reset|file)$/i,Pt=/^(?:input|select|textarea|keygen)/i;T.param=function(e,t){function n(e,t){t=b(t)?t():t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==t?"":t)}var i,r=[];if(null==e)return"";if(Array.isArray(e)||e.jquery&&!T.isPlainObject(e))T.each(e,function(){n(this.name,this.value)});else for(i in e)!function n(i,e,r,o){if(Array.isArray(e))T.each(e,function(e,t){r||jt.test(i)?o(i,t):n(i+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,o)});else if(r||"object"!==h(e))o(i,e);else for(var t in e)n(i+"["+t+"]",e[t],r,o)}(i,e[i],t,n);return r.join("&")},T.fn.extend({serialize:function(){return T.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=T.prop(this,"elements");return e?T.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!T(this).is(":disabled")&&Pt.test(this.nodeName)&&!Nt.test(e)&&(this.checked||!fe.test(e))}).map(function(e,t){var n=T(this).val();return null==n?null:Array.isArray(n)?T.map(n,function(e){return{name:t.name,value:e.replace(Ot,"\r\n")}}):{name:t.name,value:n.replace(Ot,"\r\n")}}).get()}});var Ht=/%20/g,Rt=/#.*$/,Wt=/([?&])_=[^&]*/,It=/^(.*?):[ \t]*([^\r\n]*)$/gm,Mt=/^(?:GET|HEAD)$/,Ft=/^\/\//,qt={},Yt={},Xt="*/".concat("*"),Bt=E.createElement("a");function $t(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,i=0,r=e.toLowerCase().match(R)||[];if(b(t))for(;n=r[i++];)"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function zt(t,i,r,o){var s={},a=t===Yt;function l(e){var n;return s[e]=!0,T.each(t[e]||[],function(e,t){t=t(i,r,o);return"string"!=typeof t||a||s[t]?a?!(n=t):void 0:(i.dataTypes.unshift(t),l(t),!1)}),n}return l(i.dataTypes[0])||!s["*"]&&l("*")}function Ut(e,t){var n,i,r=T.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((r[n]?e:i=i||{})[n]=t[n]);return i&&T.extend(!0,e,i),e}Bt.href=Ct.href,T.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ct.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ct.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Xt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":T.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Ut(Ut(e,T.ajaxSettings),t):Ut(T.ajaxSettings,e)},ajaxPrefilter:$t(qt),ajaxTransport:$t(Yt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0);var l,c,u,n,f,d,p,i,r,h=T.ajaxSetup({},t=t||{}),g=h.context||h,m=h.context&&(g.nodeType||g.jquery)?T(g):T.event,v=T.Deferred(),y=T.Callbacks("once memory"),b=h.statusCode||{},o={},s={},a="canceled",_={readyState:0,getResponseHeader:function(e){var t;if(d){if(!n)for(n={};t=It.exec(u);)n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2]);t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return d?u:null},setRequestHeader:function(e,t){return null==d&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,o[e]=t),this},overrideMimeType:function(e){return null==d&&(h.mimeType=e),this},statusCode:function(e){if(e)if(d)_.always(e[_.status]);else for(var t in e)b[t]=[b[t],e[t]];return this},abort:function(e){e=e||a;return l&&l.abort(e),w(0,e),this}};if(v.promise(_),h.url=((e||h.url||Ct.href)+"").replace(Ft,Ct.protocol+"//"),h.type=t.method||t.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(R)||[""],null==h.crossDomain){r=E.createElement("a");try{r.href=h.url,r.href=r.href,h.crossDomain=Bt.protocol+"//"+Bt.host!=r.protocol+"//"+r.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=T.param(h.data,h.traditional)),zt(qt,h,t,_),d)return _;for(i in(p=T.event&&h.global)&&0==T.active++&&T.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Mt.test(h.type),c=h.url.replace(Rt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(Ht,"+")):(r=h.url.slice(c.length),h.data&&(h.processData||"string"==typeof h.data)&&(c+=(Dt.test(c)?"&":"?")+h.data,delete h.data),!1===h.cache&&(c=c.replace(Wt,"$1"),r=(Dt.test(c)?"&":"?")+"_="+Lt+++r),h.url=c+r),h.ifModified&&(T.lastModified[c]&&_.setRequestHeader("If-Modified-Since",T.lastModified[c]),T.etag[c]&&_.setRequestHeader("If-None-Match",T.etag[c])),(h.data&&h.hasContent&&!1!==h.contentType||t.contentType)&&_.setRequestHeader("Content-Type",h.contentType),_.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+Xt+"; q=0.01":""):h.accepts["*"]),h.headers)_.setRequestHeader(i,h.headers[i]);if(h.beforeSend&&(!1===h.beforeSend.call(g,_,h)||d))return _.abort();if(a="abort",y.add(h.complete),_.done(h.success),_.fail(h.error),l=zt(Yt,h,t,_)){if(_.readyState=1,p&&m.trigger("ajaxSend",[_,h]),d)return _;h.async&&0<h.timeout&&(f=x.setTimeout(function(){_.abort("timeout")},h.timeout));try{d=!1,l.send(o,w)}catch(e){if(d)throw e;w(-1,e)}}else w(-1,"No Transport");function w(e,t,n,i){var r,o,s,a=t;d||(d=!0,f&&x.clearTimeout(f),l=void 0,u=i||"",_.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){for(var i,r,o,s,a=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===i&&(i=e.mimeType||t.getResponseHeader("Content-Type"));if(i)for(r in a)if(a[r]&&a[r].test(i)){l.unshift(r);break}if(l[0]in n)o=l[0];else{for(r in n){if(!l[0]||e.converters[r+" "+l[0]]){o=r;break}s=s||r}o=o||s}if(o)return o!==l[0]&&l.unshift(o),n[o]}(h,_,n)),s=function(e,t,n,i){var r,o,s,a,l,c={},u=e.dataTypes.slice();if(u[1])for(s in e.converters)c[s.toLowerCase()]=e.converters[s];for(o=u.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&i&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=u.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(!(s=c[l+" "+o]||c["* "+o]))for(r in c)if(a=r.split(" "),a[1]===o&&(s=c[l+" "+a[0]]||c["* "+a[0]])){!0===s?s=c[r]:!0!==c[r]&&(o=a[0],u.unshift(a[1]));break}if(!0!==s)if(s&&e.throws)t=s(t);else try{t=s(t)}catch(e){return{state:"parsererror",error:s?e:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}(h,s,_,i),i?(h.ifModified&&((n=_.getResponseHeader("Last-Modified"))&&(T.lastModified[c]=n),(n=_.getResponseHeader("etag"))&&(T.etag[c]=n)),204===e||"HEAD"===h.type?a="nocontent":304===e?a="notmodified":(a=s.state,r=s.data,i=!(o=s.error))):(o=a,!e&&a||(a="error",e<0&&(e=0))),_.status=e,_.statusText=(t||a)+"",i?v.resolveWith(g,[r,a,_]):v.rejectWith(g,[_,a,o]),_.statusCode(b),b=void 0,p&&m.trigger(i?"ajaxSuccess":"ajaxError",[_,h,i?r:o]),y.fireWith(g,[_,a]),p&&(m.trigger("ajaxComplete",[_,h]),--T.active||T.event.trigger("ajaxStop")))}return _},getJSON:function(e,t,n){return T.get(e,t,n,"json")},getScript:function(e,t){return T.get(e,void 0,t,"script")}}),T.each(["get","post"],function(e,r){T[r]=function(e,t,n,i){return b(t)&&(i=i||n,n=t,t=void 0),T.ajax(T.extend({url:e,type:r,dataType:i,data:t,success:n},T.isPlainObject(e)&&e))}}),T._evalUrl=function(e,t){return T.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){T.globalEval(e,t)}})},T.fn.extend({wrapAll:function(e){return this[0]&&(b(e)&&(e=e.call(this[0])),e=T(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return b(n)?this.each(function(e){T(this).wrapInner(n.call(this,e))}):this.each(function(){var e=T(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=b(t);return this.each(function(e){T(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){T(this).replaceWith(this.childNodes)}),this}}),T.expr.pseudos.hidden=function(e){return!T.expr.pseudos.visible(e)},T.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},T.ajaxSettings.xhr=function(){try{return new x.XMLHttpRequest}catch(e){}};var Kt={0:200,1223:204},Vt=T.ajaxSettings.xhr();y.cors=!!Vt&&"withCredentials"in Vt,y.ajax=Vt=!!Vt,T.ajaxTransport(function(r){var o,s;if(y.cors||Vt&&!r.crossDomain)return{send:function(e,t){var n,i=r.xhr();if(i.open(r.type,r.url,r.async,r.username,r.password),r.xhrFields)for(n in r.xhrFields)i[n]=r.xhrFields[n];for(n in r.mimeType&&i.overrideMimeType&&i.overrideMimeType(r.mimeType),r.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)i.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=s=i.onload=i.onerror=i.onabort=i.ontimeout=i.onreadystatechange=null,"abort"===e?i.abort():"error"===e?"number"!=typeof i.status?t(0,"error"):t(i.status,i.statusText):t(Kt[i.status]||i.status,i.statusText,"text"!==(i.responseType||"text")||"string"!=typeof i.responseText?{binary:i.response}:{text:i.responseText},i.getAllResponseHeaders()))}},i.onload=o(),s=i.onerror=i.ontimeout=o("error"),void 0!==i.onabort?i.onabort=s:i.onreadystatechange=function(){4===i.readyState&&x.setTimeout(function(){o&&s()})},o=o("abort");try{i.send(r.hasContent&&r.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),T.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),T.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return T.globalEval(e),e}}}),T.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),T.ajaxTransport("script",function(n){var i,r;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){i=T("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",r=function(e){i.remove(),r=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(i[0])},abort:function(){r&&r()}}});var Qt=[],Gt=/(=)\?(?=&|$)|\?\?/;T.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Qt.pop()||T.expando+"_"+Lt++;return this[e]=!0,e}}),T.ajaxPrefilter("json jsonp",function(e,t,n){var i,r,o,s=!1!==e.jsonp&&(Gt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gt.test(e.data)&&"data");if(s||"jsonp"===e.dataTypes[0])return i=e.jsonpCallback=b(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,s?e[s]=e[s].replace(Gt,"$1"+i):!1!==e.jsonp&&(e.url+=(Dt.test(e.url)?"&":"?")+e.jsonp+"="+i),e.converters["script json"]=function(){return o||T.error(i+" was not called"),o[0]},e.dataTypes[0]="json",r=x[i],x[i]=function(){o=arguments},n.always(function(){void 0===r?T(x).removeProp(i):x[i]=r,e[i]&&(e.jsonpCallback=t.jsonpCallback,Qt.push(i)),o&&b(r)&&r(o[0]),o=r=void 0}),"script"}),y.createHTMLDocument=((t=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===t.childNodes.length),T.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((i=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(i)):t=E),i=!n&&[],(n=L.exec(e))?[t.createElement(n[1])]:(n=ye([e],t,i),i&&i.length&&T(i).remove(),T.merge([],n.childNodes)));var i},T.fn.load=function(e,t,n){var i,r,o,s=this,a=e.indexOf(" ");return-1<a&&(i=xt(e.slice(a)),e=e.slice(0,a)),b(t)?(n=t,t=void 0):t&&"object"==typeof t&&(r="POST"),0<s.length&&T.ajax({url:e,type:r||"GET",dataType:"html",data:t}).done(function(e){o=arguments,s.html(i?T("<div>").append(T.parseHTML(e)).find(i):e)}).always(n&&function(e,t){s.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},T.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){T.fn[t]=function(e){return this.on(t,e)}}),T.expr.pseudos.animated=function(t){return T.grep(T.timers,function(e){return t===e.elem}).length},T.offset={setOffset:function(e,t,n){var i,r,o,s,a=T.css(e,"position"),l=T(e),c={};"static"===a&&(e.style.position="relative"),o=l.offset(),i=T.css(e,"top"),s=T.css(e,"left"),s=("absolute"===a||"fixed"===a)&&-1<(i+s).indexOf("auto")?(r=(a=l.position()).top,a.left):(r=parseFloat(i)||0,parseFloat(s)||0),null!=(t=b(t)?t.call(e,n,T.extend({},o)):t).top&&(c.top=t.top-o.top+r),null!=t.left&&(c.left=t.left-o.left+s),"using"in t?t.using.call(e,c):l.css(c)}},T.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){T.offset.setOffset(this,t,e)});var e,n=this[0];return n?n.getClientRects().length?(e=n.getBoundingClientRect(),n=n.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,i=this[0],r={top:0,left:0};if("fixed"===T.css(i,"position"))t=i.getBoundingClientRect();else{for(t=this.offset(),n=i.ownerDocument,e=i.offsetParent||n.documentElement;e&&(e===n.body||e===n.documentElement)&&"static"===T.css(e,"position");)e=e.parentNode;e&&e!==i&&1===e.nodeType&&((r=T(e).offset()).top+=T.css(e,"borderTopWidth",!0),r.left+=T.css(e,"borderLeftWidth",!0))}return{top:t.top-r.top-T.css(i,"marginTop",!0),left:t.left-r.left-T.css(i,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&"static"===T.css(e,"position");)e=e.offsetParent;return e||ie})}}),T.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,r){var o="pageYOffset"===r;T.fn[t]=function(e){return X(this,function(e,t,n){var i;return g(e)?i=e:9===e.nodeType&&(i=e.defaultView),void 0===n?i?i[r]:e[t]:void(i?i.scrollTo(o?i.pageXOffset:n,o?n:i.pageYOffset):e[t]=n)},t,e,arguments.length)}}),T.each(["top","left"],function(e,n){T.cssHooks[n]=Qe(y.pixelPosition,function(e,t){if(t)return t=Ve(e,n),Be.test(t)?T(e).position()[n]+"px":t})}),T.each({Height:"height",Width:"width"},function(s,a){T.each({padding:"inner"+s,content:a,"":"outer"+s},function(i,o){T.fn[o]=function(e,t){var n=arguments.length&&(i||"boolean"!=typeof e),r=i||(!0===e||!0===t?"margin":"border");return X(this,function(e,t,n){var i;return g(e)?0===o.indexOf("outer")?e["inner"+s]:e.document.documentElement["client"+s]:9===e.nodeType?(i=e.documentElement,Math.max(e.body["scroll"+s],i["scroll"+s],e.body["offset"+s],i["offset"+s],i["client"+s])):void 0===n?T.css(e,t,r):T.style(e,t,n,r)},a,n?e:void 0,n)}})}),T.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){T.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}}),T.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),T.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,i){return this.on(t,e,n,i)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),T.proxy=function(e,t){var n,i;if("string"==typeof t&&(i=e[t],t=e,e=i),b(e))return n=a.call(arguments,2),(i=function(){return e.apply(t||this,n.concat(a.call(arguments)))}).guid=e.guid=e.guid||T.guid++,i},T.holdReady=function(e){e?T.readyWait++:T.ready(!0)},T.isArray=Array.isArray,T.parseJSON=JSON.parse,T.nodeName=C,T.isFunction=b,T.isWindow=g,T.camelCase=U,T.type=h,T.now=Date.now,T.isNumeric=function(e){var t=T.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return T});var Zt=x.jQuery,Jt=x.$;return T.noConflict=function(e){return x.$===T&&(x.$=Jt),e&&x.jQuery===T&&(x.jQuery=Zt),T},e||(x.jQuery=x.$=T),T}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).bootstrap=t()}(this,function(){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,i=arguments[t];for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e}).apply(this,arguments)}function u(e,t){e.prototype=Object.create(t.prototype),n(e.prototype.constructor=e,t)}function n(e,t){return(n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function o(e){for(;e+=Math.floor(1e6*Math.random()),document.getElementById(e););return e}function t(e){var t=e.getAttribute("data-bs-target");if(!t||"#"===t){e=e.getAttribute("href");if(!e||!e.includes("#")&&!e.startsWith("."))return null;t=(e=e.includes("#")&&!e.startsWith("#")?"#"+e.split("#")[1]:e)&&"#"!==e?e.trim():null}return t}function f(e){return(e=t(e))&&document.querySelector(e)?e:null}function d(e){return(e=t(e))?document.querySelector(e):null}function p(e){if(!e)return 0;var t=(i=window.getComputedStyle(e)).transitionDuration,n=i.transitionDelay,e=Number.parseFloat(t),i=Number.parseFloat(n);return e||i?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0}function r(e){e.dispatchEvent(new Event(x))}function h(e){return(e[0]||e).nodeType}function g(t,e){var n=!1,e=e+5;t.addEventListener(x,function e(){n=!0,t.removeEventListener(x,e)}),setTimeout(function(){n||r(t)},e)}function m(r,o,s){Object.keys(s).forEach(function(e){var t,n=s[e],i=o[e],t=i&&h(i)?"element":null==(t=i)?""+t:{}.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(n).test(t))throw new TypeError(r.toUpperCase()+': Option "'+e+'" provided type "'+t+'" but expected type "'+n+'".')})}function s(e){if(!e)return!1;if(e.style&&e.parentNode&&e.parentNode.style){var t=getComputedStyle(e),e=getComputedStyle(e.parentNode);return"none"!==t.display&&"none"!==e.display&&"hidden"!==t.visibility}return!1}function c(e){return document.documentElement.attachShadow?"function"!=typeof e.getRootNode?e instanceof ShadowRoot?e:e.parentNode?c(e.parentNode):null:(e=e.getRootNode())instanceof ShadowRoot?e:null:null}function v(){return function(){}}function y(e){return e.offsetHeight}function b(){var e=window.jQuery;return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null}function e(n,i){var e;e=function(){var e,t=b();t&&(e=t.fn[n],t.fn[n]=i.jQueryInterface,t.fn[n].Constructor=i,t.fn[n].noConflict=function(){return t.fn[n]=e,i.jQueryInterface})},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()}var _,w,x="transitionend",E="rtl"===document.documentElement.dir,T=(_={},{set:function(e,t,n){void 0===e.bsKey&&(e.bsKey={key:t,id:w},w++),_[e.bsKey.id]=n},get:function(e,t){if(!e||void 0===e.bsKey)return null;e=e.bsKey;return e.key===t?_[e.id]:null},delete:function(e,t){var n;void 0===e.bsKey||(n=e.bsKey).key===t&&(delete _[n.id],delete e.bsKey)}}),k=function(e,t,n){T.set(e,t,n)},A=function(e,t){return T.get(e,t)},S=function(e,t){T.delete(e,t)},C=/[^.]*(?=\..*)\.|.*/,L=/\..*/,D=/::\d+$/,j={},O=w=1,N={mouseenter:"mouseover",mouseleave:"mouseout"},P=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function H(e,t){return t&&t+"::"+O++||e.uidEvent||O++}function R(e){var t=H(e);return e.uidEvent=t,j[t]=j[t]||{},j[t]}function W(e,t,n){void 0===n&&(n=null);for(var i=Object.keys(e),r=0,o=i.length;r<o;r++){var s=e[i[r]];if(s.originalHandler===t&&s.delegationSelector===n)return s}return null}function I(e,t,n){var i="string"==typeof t,r=i?n:t,n=e.replace(L,""),t=N[n];return[i,r,n=!P.has(n=t?t:n)?e:n]}function M(e,t,n,i,r){var o,s,a,l,c,u,f,d,p,h;"string"==typeof t&&e&&(n||(n=i,i=null),o=(l=I(t,n,i))[0],s=l[1],a=l[2],(c=W(l=(c=R(e))[a]||(c[a]={}),s,o?n:null))?c.oneOff=c.oneOff&&r:(t=H(s,t.replace(C,"")),(i=o?(d=e,p=n,h=i,function e(t){for(var n=d.querySelectorAll(p),i=t.target;i&&i!==this;i=i.parentNode)for(var r=n.length;r--;)if(n[r]===i)return t.delegateTarget=i,e.oneOff&&q.off(d,t.type,h),h.apply(i,[t]);return null}):(u=e,f=n,function e(t){return t.delegateTarget=u,e.oneOff&&q.off(u,t.type,f),f.apply(u,[t])})).delegationSelector=o?n:null,i.originalHandler=s,i.oneOff=r,l[i.uidEvent=t]=i,e.addEventListener(a,i,o)))}function F(e,t,n,i,r){i=W(t[n],i,r);i&&(e.removeEventListener(n,i,Boolean(r)),delete t[n][i.uidEvent])}var q={on:function(e,t,n,i){M(e,t,n,i,!1)},one:function(e,t,n,i){M(e,t,n,i,!0)},off:function(s,a,e,t){if("string"==typeof a&&s){var n=I(a,e,t),i=n[0],t=n[1],r=n[2],o=r!==a,l=R(s),n=a.startsWith(".");if(void 0!==t)return l&&l[r]?void F(s,l,r,t,i?e:null):void 0;n&&Object.keys(l).forEach(function(e){var t,n,i,r,o;t=s,n=l,i=e,r=a.slice(1),o=n[i]||{},Object.keys(o).forEach(function(e){e.includes(r)&&F(t,n,i,(e=o[e]).originalHandler,e.delegationSelector)})});var c=l[r]||{};Object.keys(c).forEach(function(e){var t=e.replace(D,"");o&&!a.includes(t)||F(s,l,r,(e=c[e]).originalHandler,e.delegationSelector)})}},trigger:function(e,t,n){if("string"!=typeof t||!e)return null;var i,r=b(),o=t.replace(L,""),s=t!==o,a=P.has(o),l=!0,c=!0,u=!1,f=null;return s&&r&&(i=r.Event(t,n),r(e).trigger(i),l=!i.isPropagationStopped(),c=!i.isImmediatePropagationStopped(),u=i.isDefaultPrevented()),a?(f=document.createEvent("HTMLEvents")).initEvent(o,l,!0):f=new CustomEvent(t,{bubbles:l,cancelable:!0}),void 0!==n&&Object.keys(n).forEach(function(e){Object.defineProperty(f,e,{get:function(){return n[e]}})}),u&&f.preventDefault(),c&&e.dispatchEvent(f),f.defaultPrevented&&void 0!==i&&i.preventDefault(),f}},Y=function(){function e(e){e&&(this._element=e,k(e,this.constructor.DATA_KEY,this))}return e.prototype.dispose=function(){S(this._element,this.constructor.DATA_KEY),this._element=null},e.getInstance=function(e){return A(e,this.DATA_KEY)},a(e,null,[{key:"VERSION",get:function(){return"5.0.0-beta2"}}]),e}(),X="bs.alert",B=function(e){function n(){return e.apply(this,arguments)||this}u(n,e);var t=n.prototype;return t.close=function(e){var t=e?this._getRootElement(e):this._element,e=this._triggerCloseEvent(t);null===e||e.defaultPrevented||this._removeElement(t)},t._getRootElement=function(e){return d(e)||e.closest(".alert")},t._triggerCloseEvent=function(e){return q.trigger(e,"close.bs.alert")},t._removeElement=function(e){var t,n=this;e.classList.remove("show"),e.classList.contains("fade")?(t=p(e),q.one(e,"transitionend",function(){return n._destroyElement(e)}),g(e,t)):this._destroyElement(e)},t._destroyElement=function(e){e.parentNode&&e.parentNode.removeChild(e),q.trigger(e,"closed.bs.alert")},n.jQueryInterface=function(t){return this.each(function(){var e=(e=A(this,X))||new n(this);"close"===t&&e[t](this)})},n.handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},a(n,null,[{key:"DATA_KEY",get:function(){return X}}]),n}(Y);q.on(document,"click.bs.alert.data-api",'[data-bs-dismiss="alert"]',B.handleDismiss(new B)),e("alert",B);var $="bs.button",z='[data-bs-toggle="button"]',U=function(e){function n(){return e.apply(this,arguments)||this}return u(n,e),n.prototype.toggle=function(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))},n.jQueryInterface=function(t){return this.each(function(){var e=(e=A(this,$))||new n(this);"toggle"===t&&e[t]()})},a(n,null,[{key:"DATA_KEY",get:function(){return $}}]),n}(Y);function K(e){return"true"===e||"false"!==e&&(e===Number(e).toString()?Number(e):""===e||"null"===e?null:e)}function V(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}q.on(document,"click.bs.button.data-api",z,function(e){e.preventDefault();e=e.target.closest(z);(A(e,$)||new U(e)).toggle()}),e("button",U);var Q={setDataAttribute:function(e,t,n){e.setAttribute("data-bs-"+V(t),n)},removeDataAttribute:function(e,t){e.removeAttribute("data-bs-"+V(t))},getDataAttributes:function(n){if(!n)return{};var i={};return Object.keys(n.dataset).filter(function(e){return e.startsWith("bs")}).forEach(function(e){var t=(t=e.replace(/^bs/,"")).charAt(0).toLowerCase()+t.slice(1,t.length);i[t]=K(n.dataset[e])}),i},getDataAttribute:function(e,t){return K(e.getAttribute("data-bs-"+V(t)))},offset:function(e){e=e.getBoundingClientRect();return{top:e.top+document.body.scrollTop,left:e.left+document.body.scrollLeft}},position:function(e){return{top:e.offsetTop,left:e.offsetLeft}}},G=function(e,t){var n;return void 0===t&&(t=document.documentElement),(n=[]).concat.apply(n,Element.prototype.querySelectorAll.call(t,e))},Z=function(e,t){return void 0===t&&(t=document.documentElement),Element.prototype.querySelector.call(t,e)},J=function(e,t){var n;return(n=[]).concat.apply(n,e.children).filter(function(e){return e.matches(t)})},ee=function(e,t){for(var n=[],i=e.parentNode;i&&i.nodeType===Node.ELEMENT_NODE&&3!==i.nodeType;)i.matches(t)&&n.push(i),i=i.parentNode;return n},te=function(e,t){for(var n=e.previousElementSibling;n;){if(n.matches(t))return[n];n=n.previousElementSibling}return[]},ne=function(e,t){for(var n=e.nextElementSibling;n;){if(n.matches(t))return[n];n=n.nextElementSibling}return[]},ie="carousel",re="bs.carousel",oe="."+re,se={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},ae={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},le="next",ce="prev",ue="slid"+oe,fe="active",de=".active.carousel-item",pe=function(n){function o(e,t){e=n.call(this,e)||this;return e._items=null,e._interval=null,e._activeElement=null,e._isPaused=!1,e._isSliding=!1,e.touchTimeout=null,e.touchStartX=0,e.touchDeltaX=0,e._config=e._getConfig(t),e._indicatorsElement=Z(".carousel-indicators",e._element),e._touchSupported="ontouchstart"in document.documentElement||0<navigator.maxTouchPoints,e._pointerEvent=Boolean(window.PointerEvent),e._addEventListeners(),e}u(o,n);var e=o.prototype;return e.next=function(){this._isSliding||this._slide(le)},e.nextWhenVisible=function(){!document.hidden&&s(this._element)&&this.next()},e.prev=function(){this._isSliding||this._slide(ce)},e.pause=function(e){e||(this._isPaused=!0),Z(".carousel-item-next, .carousel-item-prev",this._element)&&(r(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},e.cycle=function(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config&&this._config.interval&&!this._isPaused&&(this._updateInterval(),this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},e.to=function(e){var t=this;this._activeElement=Z(de,this._element);var n=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)q.one(this._element,ue,function(){return t.to(e)});else{if(n===e)return this.pause(),void this.cycle();this._slide(n<e?le:ce,this._items[e])}},e.dispose=function(){n.prototype.dispose.call(this),q.off(this._element,oe),this._items=null,this._config=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},e._getConfig=function(e){return e=l({},se,e),m(ie,e,ae),e},e._handleSwipe=function(){var e=Math.abs(this.touchDeltaX);e<=40||(e=e/this.touchDeltaX,(this.touchDeltaX=0)<e&&(E?this.next():this.prev()),e<0&&(E?this.prev():this.next()))},e._addEventListeners=function(){var t=this;this._config.keyboard&&q.on(this._element,"keydown.bs.carousel",function(e){return t._keydown(e)}),"hover"===this._config.pause&&(q.on(this._element,"mouseenter.bs.carousel",function(e){return t.pause(e)}),q.on(this._element,"mouseleave.bs.carousel",function(e){return t.cycle(e)})),this._config.touch&&this._touchSupported&&this._addTouchEventListeners()},e._addTouchEventListeners=function(){function e(e){!n._pointerEvent||"pen"!==e.pointerType&&"touch"!==e.pointerType?n._pointerEvent||(n.touchStartX=e.touches[0].clientX):n.touchStartX=e.clientX}function t(e){!n._pointerEvent||"pen"!==e.pointerType&&"touch"!==e.pointerType||(n.touchDeltaX=e.clientX-n.touchStartX),n._handleSwipe(),"hover"===n._config.pause&&(n.pause(),n.touchTimeout&&clearTimeout(n.touchTimeout),n.touchTimeout=setTimeout(function(e){return n.cycle(e)},500+n._config.interval))}var n=this;G(".carousel-item img",this._element).forEach(function(e){q.on(e,"dragstart.bs.carousel",function(e){return e.preventDefault()})}),this._pointerEvent?(q.on(this._element,"pointerdown.bs.carousel",e),q.on(this._element,"pointerup.bs.carousel",t),this._element.classList.add("pointer-event")):(q.on(this._element,"touchstart.bs.carousel",e),q.on(this._element,"touchmove.bs.carousel",function(e){(e=e).touches&&1<e.touches.length?n.touchDeltaX=0:n.touchDeltaX=e.touches[0].clientX-n.touchStartX}),q.on(this._element,"touchend.bs.carousel",t))},e._keydown=function(e){/input|textarea/i.test(e.target.tagName)||("ArrowLeft"===e.key?(e.preventDefault(),E?this.next():this.prev()):"ArrowRight"===e.key&&(e.preventDefault(),E?this.prev():this.next()))},e._getItemIndex=function(e){return this._items=e&&e.parentNode?G(".carousel-item",e.parentNode):[],this._items.indexOf(e)},e._getItemByDirection=function(e,t){var n=e===le,i=e===ce,r=this._getItemIndex(t),o=this._items.length-1;if((i&&0===r||n&&r===o)&&!this._config.wrap)return t;e=(r+(e===ce?-1:1))%this._items.length;return-1==e?this._items[this._items.length-1]:this._items[e]},e._triggerSlideEvent=function(e,t){var n=this._getItemIndex(e),i=this._getItemIndex(Z(de,this._element));return q.trigger(this._element,"slide.bs.carousel",{relatedTarget:e,direction:t,from:i,to:n})},e._setActiveIndicatorElement=function(e){if(this._indicatorsElement){var t=Z(".active",this._indicatorsElement);t.classList.remove(fe),t.removeAttribute("aria-current");for(var n=G("[data-bs-target]",this._indicatorsElement),i=0;i<n.length;i++)if(Number.parseInt(n[i].getAttribute("data-bs-slide-to"),10)===this._getItemIndex(e)){n[i].classList.add(fe),n[i].setAttribute("aria-current","true");break}}},e._updateInterval=function(){var e=this._activeElement||Z(de,this._element);e&&((e=Number.parseInt(e.getAttribute("data-bs-interval"),10))?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=e):this._config.interval=this._config.defaultInterval||this._config.interval)},e._slide=function(e,t){var n=this,i=Z(de,this._element),r=this._getItemIndex(i),o=t||i&&this._getItemByDirection(e,i),s=this._getItemIndex(o),t=Boolean(this._interval),a=e===le?"carousel-item-start":"carousel-item-end",l=e===le?"carousel-item-next":"carousel-item-prev",c=e===le?"left":"right";o&&o.classList.contains(fe)?this._isSliding=!1:this._triggerSlideEvent(o,c).defaultPrevented||i&&o&&(this._isSliding=!0,t&&this.pause(),this._setActiveIndicatorElement(o),this._activeElement=o,this._element.classList.contains("slide")?(o.classList.add(l),y(o),i.classList.add(a),o.classList.add(a),e=p(i),q.one(i,"transitionend",function(){o.classList.remove(a,l),o.classList.add(fe),i.classList.remove(fe,l,a),n._isSliding=!1,setTimeout(function(){q.trigger(n._element,ue,{relatedTarget:o,direction:c,from:r,to:s})},0)}),g(i,e)):(i.classList.remove(fe),o.classList.add(fe),this._isSliding=!1,q.trigger(this._element,ue,{relatedTarget:o,direction:c,from:r,to:s})),t&&this.cycle())},o.carouselInterface=function(e,t){var n=A(e,re),i=l({},se,Q.getDataAttributes(e));"object"==typeof t&&(i=l({},i,t));var r="string"==typeof t?t:i.slide,n=n||new o(e,i);if("number"==typeof t)n.to(t);else if("string"==typeof r){if(void 0===n[r])throw new TypeError('No method named "'+r+'"');n[r]()}else i.interval&&i.ride&&(n.pause(),n.cycle())},o.jQueryInterface=function(e){return this.each(function(){o.carouselInterface(this,e)})},o.dataApiClickHandler=function(e){var t,n,i=d(this);i&&i.classList.contains("carousel")&&(t=l({},Q.getDataAttributes(i),Q.getDataAttributes(this)),(n=this.getAttribute("data-bs-slide-to"))&&(t.interval=!1),o.carouselInterface(i,t),n&&A(i,re).to(n),e.preventDefault())},a(o,null,[{key:"Default",get:function(){return se}},{key:"DATA_KEY",get:function(){return re}}]),o}(Y);q.on(document,"click.bs.carousel.data-api","[data-bs-slide], [data-bs-slide-to]",pe.dataApiClickHandler),q.on(window,"load.bs.carousel.data-api",function(){for(var e=G('[data-bs-ride="carousel"]'),t=0,n=e.length;t<n;t++)pe.carouselInterface(e[t],A(e[t],re))}),e(ie,pe);var he="collapse",ge="bs.collapse",me={toggle:!0,parent:""},ve={toggle:"boolean",parent:"(string|element)"},ye="show",be="collapse",_e="collapsing",we="collapsed",xe='[data-bs-toggle="collapse"]',Ee=function(c){function s(t,e){var n=c.call(this,t)||this;n._isTransitioning=!1,n._config=n._getConfig(e),n._triggerArray=G(xe+'[href="#'+t.id+'"],'+xe+'[data-bs-target="#'+t.id+'"]');for(var i=G(xe),r=0,o=i.length;r<o;r++){var s=i[r],a=f(s),l=G(a).filter(function(e){return e===t});null!==a&&l.length&&(n._selector=a,n._triggerArray.push(s))}return n._parent=n._config.parent?n._getParent():null,n._config.parent||n._addAriaAndCollapsedClass(n._element,n._triggerArray),n._config.toggle&&n.toggle(),n}u(s,c);var e=s.prototype;return e.toggle=function(){this._element.classList.contains(ye)?this.hide():this.show()},e.show=function(){var t=this;if(!this._isTransitioning&&!this._element.classList.contains(ye)){this._parent&&0===(n=G(".show, .collapsing",this._parent).filter(function(e){return"string"==typeof t._config.parent?e.getAttribute("data-bs-parent")===t._config.parent:e.classList.contains(be)})).length&&(n=null);var e,n,i=Z(this._selector);if(n){var r,o=n.find(function(e){return i!==e});if((r=o?A(o,ge):null)&&r._isTransitioning)return}q.trigger(this._element,"show.bs.collapse").defaultPrevented||(n&&n.forEach(function(e){i!==e&&s.collapseInterface(e,"hide"),r||k(e,ge,null)}),e=this._getDimension(),this._element.classList.remove(be),this._element.classList.add(_e),this._element.style[e]=0,this._triggerArray.length&&this._triggerArray.forEach(function(e){e.classList.remove(we),e.setAttribute("aria-expanded",!0)}),this.setTransitioning(!0),o="scroll"+(e[0].toUpperCase()+e.slice(1)),n=p(this._element),q.one(this._element,"transitionend",function(){t._element.classList.remove(_e),t._element.classList.add(be,ye),t._element.style[e]="",t.setTransitioning(!1),q.trigger(t._element,"shown.bs.collapse")}),g(this._element,n),this._element.style[e]=this._element[o]+"px")}},e.hide=function(){var e=this;if(!this._isTransitioning&&this._element.classList.contains(ye)&&!q.trigger(this._element,"hide.bs.collapse").defaultPrevented){var t=this._getDimension();this._element.style[t]=this._element.getBoundingClientRect()[t]+"px",y(this._element),this._element.classList.add(_e),this._element.classList.remove(be,ye);var n=this._triggerArray.length;if(0<n)for(var i=0;i<n;i++){var r=this._triggerArray[i],o=d(r);o&&!o.classList.contains(ye)&&(r.classList.add(we),r.setAttribute("aria-expanded",!1))}this.setTransitioning(!0);this._element.style[t]="";t=p(this._element);q.one(this._element,"transitionend",function(){e.setTransitioning(!1),e._element.classList.remove(_e),e._element.classList.add(be),q.trigger(e._element,"hidden.bs.collapse")}),g(this._element,t)}},e.setTransitioning=function(e){this._isTransitioning=e},e.dispose=function(){c.prototype.dispose.call(this),this._config=null,this._parent=null,this._triggerArray=null,this._isTransitioning=null},e._getConfig=function(e){return(e=l({},me,e)).toggle=Boolean(e.toggle),m(he,e,ve),e},e._getDimension=function(){return this._element.classList.contains("width")?"width":"height"},e._getParent=function(){var n=this,e=this._config.parent;return h(e)?void 0===e.jquery&&void 0===e[0]||(e=e[0]):e=Z(e),G(xe+'[data-bs-parent="'+e+'"]',e).forEach(function(e){var t=d(e);n._addAriaAndCollapsedClass(t,[e])}),e},e._addAriaAndCollapsedClass=function(e,t){var n;e&&t.length&&(n=e.classList.contains(ye),t.forEach(function(e){n?e.classList.remove(we):e.classList.add(we),e.setAttribute("aria-expanded",n)}))},s.collapseInterface=function(e,t){var n=A(e,ge),i=l({},me,Q.getDataAttributes(e),"object"==typeof t&&t?t:{});if(!n&&i.toggle&&"string"==typeof t&&/show|hide/.test(t)&&(i.toggle=!1),n=n||new s(e,i),"string"==typeof t){if(void 0===n[t])throw new TypeError('No method named "'+t+'"');n[t]()}},s.jQueryInterface=function(e){return this.each(function(){s.collapseInterface(this,e)})},a(s,null,[{key:"Default",get:function(){return me}},{key:"DATA_KEY",get:function(){return ge}}]),s}(Y);q.on(document,"click.bs.collapse.data-api",xe,function(e){("A"===e.target.tagName||e.delegateTarget&&"A"===e.delegateTarget.tagName)&&e.preventDefault();var n=Q.getDataAttributes(this),e=f(this);G(e).forEach(function(e){var t=A(e,ge),t=t?(null===t._parent&&"string"==typeof n.parent&&(t._config.parent=n.parent,t._parent=t._getParent()),"toggle"):n;Ee.collapseInterface(e,t)})}),e(he,Ee);var Te="top",ke="bottom",Ae="right",Se="left",Ce="auto",Le=[Te,ke,Ae,Se],De="start",je="end",Oe="clippingParents",Ne="viewport",Pe="popper",He="reference",Re=Le.reduce(function(e,t){return e.concat([t+"-"+De,t+"-"+je])},[]),We=[].concat(Le,[Ce]).reduce(function(e,t){return e.concat([t,t+"-"+De,t+"-"+je])},[]),Ie="beforeRead",Me="afterRead",Fe="beforeMain",qe="afterMain",Ye="beforeWrite",Xe="afterWrite",Be=[Ie,"read",Me,Fe,"main",qe,Ye,"write",Xe];function $e(e){return e?(e.nodeName||"").toLowerCase():null}function ze(e){if("[object Window]"===e.toString())return e;e=e.ownerDocument;return e&&e.defaultView||window}function Ue(e){return e instanceof ze(e).Element||e instanceof Element}function Ke(e){return e instanceof ze(e).HTMLElement||e instanceof HTMLElement}var Ve={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var r=e.state;Object.keys(r.elements).forEach(function(e){var t=r.styles[e]||{},n=r.attributes[e]||{},i=r.elements[e];Ke(i)&&$e(i)&&(Object.assign(i.style,t),Object.keys(n).forEach(function(e){var t=n[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)}))})},effect:function(e){var i=e.state,r={popper:{position:i.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(i.elements.popper.style,r.popper),i.elements.arrow&&Object.assign(i.elements.arrow.style,r.arrow),function(){Object.keys(i.elements).forEach(function(e){var t=i.elements[e],n=i.attributes[e]||{},e=Object.keys((i.styles.hasOwnProperty(e)?i.styles:r)[e]).reduce(function(e,t){return e[t]="",e},{});Ke(t)&&$e(t)&&(Object.assign(t.style,e),Object.keys(n).forEach(function(e){t.removeAttribute(e)}))})}},requires:["computeStyles"]};function Qe(e){return e.split("-")[0]}function Ge(e){return{x:e.offsetLeft,y:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight}}function Ze(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&((n=n)instanceof ze(n).ShadowRoot||n instanceof ShadowRoot)){var i=t;do{if(i&&e.isSameNode(i))return!0}while(i=i.parentNode||i.host)}return!1}function Je(e){return ze(e).getComputedStyle(e)}function et(e){return((Ue(e)?e.ownerDocument:e.document)||window.document).documentElement}function tt(e){return"html"===$e(e)?e:e.assignedSlot||e.parentNode||e.host||et(e)}function nt(e){if(!Ke(e)||"fixed"===Je(e).position)return null;var t=e.offsetParent;if(t){e=et(t);if("body"===$e(t)&&"static"===Je(t).position&&"static"!==Je(e).position)return e}return t}function it(e){for(var t=ze(e),n=nt(e);n&&0<=["table","td","th"].indexOf($e(n))&&"static"===Je(n).position;)n=nt(n);return(!n||"body"!==$e(n)||"static"!==Je(n).position)&&(n||function(e){for(var t=tt(e);Ke(t)&&["html","body"].indexOf($e(t))<0;){var n=Je(t);if("none"!==n.transform||"none"!==n.perspective||n.willChange&&"auto"!==n.willChange)return t;t=t.parentNode}return null}(e))||t}function rt(e){return 0<=["top","bottom"].indexOf(e)?"x":"y"}function ot(e,t,n){return Math.max(e,Math.min(t,n))}function st(){return{top:0,right:0,bottom:0,left:0}}function at(e){return Object.assign(Object.assign({},st()),e)}function lt(n,e){return e.reduce(function(e,t){return e[t]=n,e},{})}var ct={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n,i,r=e.state,o=e.name,s=r.elements.arrow,a=r.modifiersData.popperOffsets,l=Qe(r.placement),c=rt(l),u=0<=[Se,Ae].indexOf(l)?"height":"width";s&&a&&(t=r.modifiersData[o+"#persistent"].padding,n=Ge(s),i="y"===c?Te:Se,e="y"===c?ke:Ae,l=r.rects.reference[u]+r.rects.reference[c]-a[c]-r.rects.popper[u],a=a[c]-r.rects.reference[c],s=(s=it(s))?"y"===c?s.clientHeight||0:s.clientWidth||0:0,i=t[i],e=s-n[u]-t[e],e=ot(i,a=s/2-n[u]/2+(l/2-a/2),e),r.modifiersData[o]=((o={})[c]=e,o.centerOffset=e-a,o))},effect:function(e){var t=e.state,n=e.options,i=e.name,e=void 0===(e=n.element)?"[data-popper-arrow]":e,n=void 0===(n=n.padding)?0:n;null!=e&&("string"!=typeof e||(e=t.elements.popper.querySelector(e)))&&Ze(t.elements.popper,e)&&(t.elements.arrow=e,t.modifiersData[i+"#persistent"]={padding:at("number"!=typeof n?n:lt(n,Le))})},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},ut={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ft(e){var t,n=e.popper,i=e.popperRect,r=e.placement,o=e.offsets,s=e.position,a=e.gpuAcceleration,l=e.adaptive,c=e.roundOffsets?(t=(p=o).x,d=p.y,p=window.devicePixelRatio||1,{x:Math.round(t*p)/p||0,y:Math.round(d*p)/p||0}):o,u=c.x,f=void 0===u?0:u,e=c.y,t=void 0===e?0:e,d=o.hasOwnProperty("x"),p=o.hasOwnProperty("y"),u=Se,c=Te,e=window;l&&((o=it(n))===ze(n)&&(o=et(n)),r===Te&&(c=ke,t-=o.clientHeight-i.height,t*=a?1:-1),r===Se&&(u=Ae,f-=o.clientWidth-i.width,f*=a?1:-1));var l=Object.assign({position:s},l&&ut);return a?Object.assign(Object.assign({},l),{},((a={})[c]=p?"0":"",a[u]=d?"0":"",a.transform=(e.devicePixelRatio||1)<2?"translate("+f+"px, "+t+"px)":"translate3d("+f+"px, "+t+"px, 0)",a)):Object.assign(Object.assign({},l),{},((l={})[c]=p?t+"px":"",l[u]=d?f+"px":"",l.transform="",l))}var dt={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,e=void 0===(i=n.gpuAcceleration)||i,i=void 0===(i=n.adaptive)||i,n=void 0===(n=n.roundOffsets)||n,e={placement:Qe(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:e};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign(Object.assign({},t.styles.popper),ft(Object.assign(Object.assign({},e),{},{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:n})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign(Object.assign({},t.styles.arrow),ft(Object.assign(Object.assign({},e),{},{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:n})))),t.attributes.popper=Object.assign(Object.assign({},t.attributes.popper),{},{"data-popper-placement":t.placement})},data:{}},pt={passive:!0};var ht={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,i=e.options,r=void 0===(e=i.scroll)||e,o=void 0===(i=i.resize)||i,s=ze(t.elements.popper),a=[].concat(t.scrollParents.reference,t.scrollParents.popper);return r&&a.forEach(function(e){e.addEventListener("scroll",n.update,pt)}),o&&s.addEventListener("resize",n.update,pt),function(){r&&a.forEach(function(e){e.removeEventListener("scroll",n.update,pt)}),o&&s.removeEventListener("resize",n.update,pt)}},data:{}},gt={left:"right",right:"left",bottom:"top",top:"bottom"};function mt(e){return e.replace(/left|right|bottom|top/g,function(e){return gt[e]})}var vt={start:"end",end:"start"};function yt(e){return e.replace(/start|end/g,function(e){return vt[e]})}function bt(e){e=e.getBoundingClientRect();return{width:e.width,height:e.height,top:e.top,right:e.right,bottom:e.bottom,left:e.left,x:e.left,y:e.top}}function _t(e){e=ze(e);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function wt(e){return bt(et(e)).left+_t(e).scrollLeft}function xt(e){var t=Je(e),n=t.overflow,e=t.overflowX,t=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+t+e)}function Et(e,t){void 0===t&&(t=[]);var n=function e(t){return 0<=["html","body","#document"].indexOf($e(t))?t.ownerDocument.body:Ke(t)&&xt(t)?t:e(tt(t))}(e),i="body"===$e(n),e=ze(n),n=i?[e].concat(e.visualViewport||[],xt(n)?n:[]):n,t=t.concat(n);return i?t:t.concat(Et(tt(n)))}function Tt(e){return Object.assign(Object.assign({},e),{},{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function kt(e,t){return t===Ne?Tt((o=ze(r=e),s=et(r),a=o.visualViewport,l=s.clientWidth,c=s.clientHeight,s=o=0,a&&(l=a.width,c=a.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(o=a.offsetLeft,s=a.offsetTop)),{width:l,height:c,x:o+wt(r),y:s})):Ke(t)?((i=bt(n=t)).top=i.top+n.clientTop,i.left=i.left+n.clientLeft,i.bottom=i.top+n.clientHeight,i.right=i.left+n.clientWidth,i.width=n.clientWidth,i.height=n.clientHeight,i.x=i.left,i.y=i.top,i):Tt((r=et(e),s=et(r),t=_t(r),n=r.ownerDocument.body,i=Math.max(s.scrollWidth,s.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),e=Math.max(s.scrollHeight,s.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),r=-t.scrollLeft+wt(r),t=-t.scrollTop,"rtl"===Je(n||s).direction&&(r+=Math.max(s.clientWidth,n?n.clientWidth:0)-i),{width:i,height:e,x:r,y:t}));var n,i,r,o,s,a,l,c}function At(n,e,t){var i,r,o,e="clippingParents"===e?(r=Et(tt(i=n)),Ue(o=0<=["absolute","fixed"].indexOf(Je(i).position)&&Ke(i)?it(i):i)?r.filter(function(e){return Ue(e)&&Ze(e,o)&&"body"!==$e(e)}):[]):[].concat(e),e=[].concat(e,[t]),t=e[0],t=e.reduce(function(e,t){t=kt(n,t);return e.top=Math.max(t.top,e.top),e.right=Math.min(t.right,e.right),e.bottom=Math.min(t.bottom,e.bottom),e.left=Math.max(t.left,e.left),e},kt(n,t));return t.width=t.right-t.left,t.height=t.bottom-t.top,t.x=t.left,t.y=t.top,t}function St(e){return e.split("-")[1]}function Ct(e){var t,n=e.reference,i=e.element,r=e.placement,e=r?Qe(r):null,r=r?St(r):null,o=n.x+n.width/2-i.width/2,s=n.y+n.height/2-i.height/2;switch(e){case Te:t={x:o,y:n.y-i.height};break;case ke:t={x:o,y:n.y+n.height};break;case Ae:t={x:n.x+n.width,y:s};break;case Se:t={x:n.x-i.width,y:s};break;default:t={x:n.x,y:n.y}}var a=e?rt(e):null;if(null!=a){var l="y"===a?"height":"width";switch(r){case De:t[a]=t[a]-(n[l]/2-i[l]/2);break;case je:t[a]=t[a]+(n[l]/2-i[l]/2)}}return t}function Lt(e,t){var i,n=(t=void 0===t?{}:t).placement,r=void 0===n?e.placement:n,o=t.boundary,s=void 0===o?Oe:o,a=t.rootBoundary,l=void 0===a?Ne:a,c=t.elementContext,n=void 0===c?Pe:c,o=t.altBoundary,a=void 0!==o&&o,c=t.padding,o=void 0===c?0:c,t=at("number"!=typeof o?o:lt(o,Le)),c=e.elements.reference,o=e.rects.popper,a=e.elements[a?n===Pe?He:Pe:n],s=At(Ue(a)?a:a.contextElement||et(e.elements.popper),s,l),l=bt(c),c=Ct({reference:l,element:o,strategy:"absolute",placement:r}),c=Tt(Object.assign(Object.assign({},o),c)),l=n===Pe?c:l,u={top:s.top-l.top+t.top,bottom:l.bottom-s.bottom+t.bottom,left:s.left-l.left+t.left,right:l.right-s.right+t.right},e=e.modifiersData.offset;return n===Pe&&e&&(i=e[r],Object.keys(u).forEach(function(e){var t=0<=[Ae,ke].indexOf(e)?1:-1,n=0<=[Te,ke].indexOf(e)?"y":"x";u[e]+=i[n]*t})),u}var Dt={name:"flip",enabled:!0,phase:"main",fn:function(e){var f=e.state,t=e.options,n=e.name;if(!f.modifiersData[n]._skip){for(var i=t.mainAxis,r=void 0===i||i,e=t.altAxis,o=void 0===e||e,i=t.fallbackPlacements,d=t.padding,p=t.boundary,h=t.rootBoundary,s=t.altBoundary,e=t.flipVariations,g=void 0===e||e,m=t.allowedAutoPlacements,e=f.options.placement,t=Qe(e),t=i||(t===e||!g?[mt(e)]:function(e){if(Qe(e)===Ce)return[];var t=mt(e);return[yt(e),t,yt(t)]}(e)),a=[e].concat(t).reduce(function(e,t){return e.concat(Qe(t)===Ce?(n=f,r=(i=void 0===(i={placement:t,boundary:p,rootBoundary:h,padding:d,flipVariations:g,allowedAutoPlacements:m})?{}:i).placement,o=i.boundary,s=i.rootBoundary,a=i.padding,e=i.flipVariations,l=void 0===(i=i.allowedAutoPlacements)?We:i,c=St(r),r=c?e?Re:Re.filter(function(e){return St(e)===c}):Le,u=(e=0===(e=r.filter(function(e){return 0<=l.indexOf(e)})).length?r:e).reduce(function(e,t){return e[t]=Lt(n,{placement:t,boundary:o,rootBoundary:s,padding:a})[Qe(t)],e},{}),Object.keys(u).sort(function(e,t){return u[e]-u[t]})):t);var n,i,r,o,s,a,l,c,u},[]),l=f.rects.reference,c=f.rects.popper,u=new Map,v=!0,y=a[0],b=0;b<a.length;b++){var _=a[b],w=Qe(_),x=St(_)===De,E=0<=[Te,ke].indexOf(w),T=E?"width":"height",k=Lt(f,{placement:_,boundary:p,rootBoundary:h,altBoundary:s,padding:d}),E=E?x?Ae:Se:x?ke:Te;l[T]>c[T]&&(E=mt(E));x=mt(E),T=[];if(r&&T.push(k[w]<=0),o&&T.push(k[E]<=0,k[x]<=0),T.every(function(e){return e})){y=_,v=!1;break}u.set(_,T)}if(v)for(var A=g?3:1;0<A;A--)if("break"===function(t){var e=a.find(function(e){e=u.get(e);if(e)return e.slice(0,t).every(function(e){return e})});if(e)return y=e,"break"}(A))break;f.placement!==y&&(f.modifiersData[n]._skip=!0,f.placement=y,f.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function jt(e,t,n){return{top:e.top-t.height-(n=void 0===n?{x:0,y:0}:n).y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Ot(t){return[Te,Ae,ke,Se].some(function(e){return 0<=t[e]})}var Nt={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,i=t.rects.reference,r=t.rects.popper,o=t.modifiersData.preventOverflow,s=Lt(t,{elementContext:"reference"}),e=Lt(t,{altBoundary:!0}),i=jt(s,i),e=jt(e,r,o),r=Ot(i),o=Ot(e);t.modifiersData[n]={referenceClippingOffsets:i,popperEscapeOffsets:e,isReferenceHidden:r,hasPopperEscaped:o},t.attributes.popper=Object.assign(Object.assign({},t.attributes.popper),{},{"data-popper-reference-hidden":r,"data-popper-escaped":o})}};var Pt={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var s=e.state,t=e.options,n=e.name,a=void 0===(i=t.offset)?[0,0]:i,e=We.reduce(function(e,t){var n,i,r,o;return e[t]=(n=t,i=s.rects,r=a,o=Qe(n),t=0<=[Se,Te].indexOf(o)?-1:1,r=(r=(n="function"==typeof r?r(Object.assign(Object.assign({},i),{},{placement:n})):r)[0])||0,n=((n=n[1])||0)*t,0<=[Se,Ae].indexOf(o)?{x:n,y:r}:{x:r,y:n}),e},{}),i=(t=e[s.placement]).x,t=t.y;null!=s.modifiersData.popperOffsets&&(s.modifiersData.popperOffsets.x+=i,s.modifiersData.popperOffsets.y+=t),s.modifiersData[n]=e}};var Ht={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,e=e.name;t.modifiersData[e]=Ct({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}};var Rt={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,i=e.name,r=void 0===(_=n.mainAxis)||_,o=void 0!==(w=n.altAxis)&&w,s=n.boundary,a=n.rootBoundary,l=n.altBoundary,c=n.padding,u=void 0===(x=n.tether)||x,f=n.tetherOffset,d=void 0===f?0:f,p=Lt(t,{boundary:s,rootBoundary:a,padding:c,altBoundary:l}),h=Qe(t.placement),g=St(t.placement),m=!g,v=rt(h),y="x"===v?"y":"x",b=t.modifiersData.popperOffsets,e=t.rects.reference,_=t.rects.popper,w="function"==typeof d?d(Object.assign(Object.assign({},t.rects),{},{placement:t.placement})):d,x={x:0,y:0};b&&(r&&(n="y"===v?"height":"width",f=b[v],a=b[v]+p[s="y"===v?Te:Se],l=b[v]-p[c="y"===v?ke:Ae],h=u?-_[n]/2:0,d=(g===De?e:_)[n],r=g===De?-_[n]:-e[n],g=t.elements.arrow,_=u&&g?Ge(g):{width:0,height:0},s=(g=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:st())[s],c=g[c],_=ot(0,e[n],_[n]),s=m?e[n]/2-h-_-s-w:d-_-s-w,_=m?-e[n]/2+h+_+c+w:r+_+c+w,w=(c=t.elements.arrow&&it(t.elements.arrow))?"y"===v?c.clientTop||0:c.clientLeft||0:0,c=t.modifiersData.offset?t.modifiersData.offset[t.placement][v]:0,w=b[v]+s-c-w,c=b[v]+_-c,l=ot(u?Math.min(a,w):a,f,u?Math.max(l,c):l),b[v]=l,x[v]=l-f),o&&(v=ot((o=b[y])+p["x"===v?Te:Se],o,o-p["x"===v?ke:Ae]),b[y]=v,x[y]=v-o),t.modifiersData[i]=x)},requiresIfExists:["offset"]};function Wt(e,t,n){void 0===n&&(n=!1);var i=et(t),r=bt(e),o=Ke(t),s={scrollLeft:0,scrollTop:0},e={x:0,y:0};return!o&&(o||n)||("body"===$e(t)&&!xt(i)||(s=(o=t)!==ze(o)&&Ke(o)?{scrollLeft:(n=o).scrollLeft,scrollTop:n.scrollTop}:_t(o)),Ke(t)?((e=bt(t)).x+=t.clientLeft,e.y+=t.clientTop):i&&(e.x=wt(i))),{x:r.left+s.scrollLeft-e.x,y:r.top+s.scrollTop-e.y,width:r.width,height:r.height}}function It(e){var n=new Map,i=new Set,r=[];return e.forEach(function(e){n.set(e.name,e)}),e.forEach(function(e){i.has(e.name)||!function t(e){i.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach(function(e){i.has(e)||(e=n.get(e))&&t(e)}),r.push(e)}(e)}),r}var Mt={placement:"bottom",modifiers:[],strategy:"absolute"};function Ft(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(e){return!(e&&"function"==typeof e.getBoundingClientRect)})}function qt(e){var t=(e=void 0===e?{}:e).defaultModifiers,f=void 0===t?[]:t,e=e.defaultOptions,d=void 0===e?Mt:e;return function(i,r,t){void 0===t&&(t=d);var n,o,s={placement:"bottom",orderedModifiers:[],options:Object.assign(Object.assign({},Mt),d),modifiersData:{},elements:{reference:i,popper:r},attributes:{},styles:{}},a=[],l=!1,c={state:s,setOptions:function(e){u(),s.options=Object.assign(Object.assign(Object.assign({},d),s.options),e),s.scrollParents={reference:Ue(i)?Et(i):i.contextElement?Et(i.contextElement):[],popper:Et(r)};var n,t,e=(e=[].concat(f,s.options.modifiers),t=e.reduce(function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign(Object.assign(Object.assign({},n),t),{},{options:Object.assign(Object.assign({},n.options),t.options),data:Object.assign(Object.assign({},n.data),t.data)}):t,e},{}),e=Object.keys(t).map(function(e){return t[e]}),n=It(e),Be.reduce(function(e,t){return e.concat(n.filter(function(e){return e.phase===t}))},[]));return s.orderedModifiers=e.filter(function(e){return e.enabled}),s.orderedModifiers.forEach(function(e){var t=e.name,n=e.options,e=e.effect;"function"==typeof e&&(n=e({state:s,name:t,instance:c,options:void 0===n?{}:n}),a.push(n||function(){}))}),c.update()},forceUpdate:function(){if(!l){var e=s.elements,t=e.reference,e=e.popper;if(Ft(t,e)){s.rects={reference:Wt(t,it(e),"fixed"===s.options.strategy),popper:Ge(e)},s.reset=!1,s.placement=s.options.placement,s.orderedModifiers.forEach(function(e){return s.modifiersData[e.name]=Object.assign({},e.data)});for(var n,i,r,o=0;o<s.orderedModifiers.length;o++)!0!==s.reset?(n=(r=s.orderedModifiers[o]).fn,i=r.options,r=r.name,"function"==typeof n&&(s=n({state:s,options:void 0===i?{}:i,name:r,instance:c})||s)):(s.reset=!1,o=-1)}}},update:(n=function(){return new Promise(function(e){c.forceUpdate(),e(s)})},function(){return o=o||new Promise(function(e){Promise.resolve().then(function(){o=void 0,e(n())})})}),destroy:function(){u(),l=!0}};return Ft(i,r)&&c.setOptions(t).then(function(e){!l&&t.onFirstUpdate&&t.onFirstUpdate(e)}),c;function u(){a.forEach(function(e){return e()}),a=[]}}}var Yt=qt({defaultModifiers:[ht,Ht,dt,Ve,Pt,Dt,Rt,ct,Nt]}),Xt=Object.freeze({__proto__:null,popperGenerator:qt,detectOverflow:Lt,createPopperBase:qt(),createPopper:Yt,createPopperLite:qt({defaultModifiers:[ht,Ht,dt,Ve]}),top:Te,bottom:ke,right:Ae,left:Se,auto:Ce,basePlacements:Le,start:De,end:je,clippingParents:Oe,viewport:Ne,popper:Pe,reference:He,variationPlacements:Re,placements:We,beforeRead:Ie,read:"read",afterRead:Me,beforeMain:Fe,main:"main",afterMain:qe,beforeWrite:Ye,write:"write",afterWrite:Xe,modifierPhases:Be,applyStyles:Ve,arrow:ct,computeStyles:dt,eventListeners:ht,flip:Dt,hide:Nt,offset:Pt,popperOffsets:Ht,preventOverflow:Rt}),Bt="dropdown",$t="bs.dropdown",zt="."+$t,Pt=".data-api",Ut="Escape",Kt="ArrowUp",Vt="ArrowDown",Qt=new RegExp(Kt+"|"+Vt+"|"+Ut),Gt="hide"+zt,Zt="hidden"+zt,Ht="click"+zt+Pt,Rt="keydown"+zt+Pt,Jt="disabled",en="show",tn='[data-bs-toggle="dropdown"]',nn=".dropdown-menu",rn=E?"top-end":"top-start",on=E?"top-start":"top-end",sn=E?"bottom-end":"bottom-start",an=E?"bottom-start":"bottom-end",ln=E?"left-start":"right-start",cn=E?"right-start":"left-start",un={offset:[0,2],flip:!0,boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null},fn={offset:"(array|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element|object)",display:"string",popperConfig:"(null|object|function)"},dn=function(n){function o(e,t){e=n.call(this,e)||this;return e._popper=null,e._config=e._getConfig(t),e._menu=e._getMenuElement(),e._inNavbar=e._detectNavbar(),e._addEventListeners(),e}u(o,n);var e=o.prototype;return e.toggle=function(){var e;this._element.disabled||this._element.classList.contains(Jt)||(e=this._element.classList.contains(en),o.clearMenus(),e||this.show())},e.show=function(){if(!(this._element.disabled||this._element.classList.contains(Jt)||this._menu.classList.contains(en))){var e=o.getParentFromElement(this._element),t={relatedTarget:this._element};if(!q.trigger(this._element,"show.bs.dropdown",t).defaultPrevented){if(this._inNavbar)Q.setDataAttribute(this._menu,"popper","none");else{if(void 0===Xt)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");var n=this._element;"parent"===this._config.reference?n=e:h(this._config.reference)?(n=this._config.reference,void 0!==this._config.reference.jquery&&(n=this._config.reference[0])):"object"==typeof this._config.reference&&(n=this._config.reference);var i=this._getPopperConfig(),r=i.modifiers.find(function(e){return"applyStyles"===e.name&&!1===e.enabled});this._popper=Yt(n,this._menu,i),r&&Q.setDataAttribute(this._menu,"popper","static")}"ontouchstart"in document.documentElement&&!e.closest(".navbar-nav")&&(e=[]).concat.apply(e,document.body.children).forEach(function(e){return q.on(e,"mouseover",null,v())}),this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.toggle(en),this._element.classList.toggle(en),q.trigger(this._element,"shown.bs.dropdown",t)}}},e.hide=function(){var e;this._element.disabled||this._element.classList.contains(Jt)||!this._menu.classList.contains(en)||(e={relatedTarget:this._element},q.trigger(this._element,Gt,e).defaultPrevented||(this._popper&&this._popper.destroy(),this._menu.classList.toggle(en),this._element.classList.toggle(en),Q.removeDataAttribute(this._menu,"popper"),q.trigger(this._element,Zt,e)))},e.dispose=function(){n.prototype.dispose.call(this),q.off(this._element,zt),this._menu=null,this._popper&&(this._popper.destroy(),this._popper=null)},e.update=function(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()},e._addEventListeners=function(){var t=this;q.on(this._element,"click.bs.dropdown",function(e){e.preventDefault(),e.stopPropagation(),t.toggle()})},e._getConfig=function(e){if(e=l({},this.constructor.Default,Q.getDataAttributes(this._element),e),m(Bt,e,this.constructor.DefaultType),"object"==typeof e.reference&&!h(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(Bt.toUpperCase()+': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');return e},e._getMenuElement=function(){return ne(this._element,nn)[0]},e._getPlacement=function(){var e=this._element.parentNode;if(e.classList.contains("dropend"))return ln;if(e.classList.contains("dropstart"))return cn;var t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return e.classList.contains("dropup")?t?on:rn:t?an:sn},e._detectNavbar=function(){return null!==this._element.closest(".navbar")},e._getOffset=function(){var t=this,n=this._config.offset;return"string"==typeof n?n.split(",").map(function(e){return Number.parseInt(e,10)}):"function"==typeof n?function(e){return n(e,t._element)}:n},e._getPopperConfig=function(){var e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{altBoundary:this._config.flip,boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return"static"===this._config.display&&(e.modifiers=[{name:"applyStyles",enabled:!1}]),l({},e,"function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig)},o.dropdownInterface=function(e,t){var n=(n=A(e,$t))||new o(e,"object"==typeof t?t:null);if("string"==typeof t){if(void 0===n[t])throw new TypeError('No method named "'+t+'"');n[t]()}},o.jQueryInterface=function(e){return this.each(function(){o.dropdownInterface(this,e)})},o.clearMenus=function(e){if(!e||2!==e.button&&("keyup"!==e.type||"Tab"===e.key))for(var t=G(tn),n=0,i=t.length;n<i;n++){var r,o,s=A(t[n],$t),a={relatedTarget:t[n]};e&&"click"===e.type&&(a.clickEvent=e),s&&(r=s._menu,t[n].classList.contains(en)&&(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&"Tab"===e.key)&&r.contains(e.target)||q.trigger(t[n],Gt,a).defaultPrevented||("ontouchstart"in document.documentElement&&(o=[]).concat.apply(o,document.body.children).forEach(function(e){return q.off(e,"mouseover",null,v())}),t[n].setAttribute("aria-expanded","false"),s._popper&&s._popper.destroy(),r.classList.remove(en),t[n].classList.remove(en),Q.removeDataAttribute(r,"popper"),q.trigger(t[n],Zt,a))))}},o.getParentFromElement=function(e){return d(e)||e.parentNode},o.dataApiKeydownHandler=function(e){if((/input|textarea/i.test(e.target.tagName)?!("Space"===e.key||e.key!==Ut&&(e.key!==Vt&&e.key!==Kt||e.target.closest(nn))):Qt.test(e.key))&&(e.preventDefault(),e.stopPropagation(),!this.disabled&&!this.classList.contains(Jt))){var t=o.getParentFromElement(this),n=this.classList.contains(en);if(e.key===Ut)return(this.matches(tn)?this:te(this,tn)[0]).focus(),void o.clearMenus();n||e.key!==Kt&&e.key!==Vt?n&&"Space"!==e.key?(n=G(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",t).filter(s)).length&&(t=n.indexOf(e.target),e.key===Kt&&0<t&&t--,e.key===Vt&&t<n.length-1&&t++,n[t=-1===t?0:t].focus()):o.clearMenus():(this.matches(tn)?this:te(this,tn)[0]).click()}},a(o,null,[{key:"Default",get:function(){return un}},{key:"DefaultType",get:function(){return fn}},{key:"DATA_KEY",get:function(){return $t}}]),o}(Y);q.on(document,Rt,tn,dn.dataApiKeydownHandler),q.on(document,Rt,nn,dn.dataApiKeydownHandler),q.on(document,Ht,dn.clearMenus),q.on(document,"keyup.bs.dropdown.data-api",dn.clearMenus),q.on(document,Ht,tn,function(e){e.preventDefault(),e.stopPropagation(),dn.dropdownInterface(this,"toggle")}),q.on(document,Ht,".dropdown form",function(e){return e.stopPropagation()}),e(Bt,dn);var pn="bs.modal",hn="."+pn,gn={backdrop:!0,keyboard:!0,focus:!0},mn={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean"},vn="hidden"+hn,yn="show"+hn,bn="focusin"+hn,_n="resize"+hn,wn="click.dismiss"+hn,xn="keydown.dismiss"+hn,En="mousedown.dismiss"+hn,Tn="modal-open",kn="fade",An="show",Sn="modal-static",Cn=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Ln=".sticky-top",Dn=function(i){function r(e,t){var n=i.call(this,e)||this;return n._config=n._getConfig(t),n._dialog=Z(".modal-dialog",e),n._backdrop=null,n._isShown=!1,n._isBodyOverflowing=!1,n._ignoreBackdropClick=!1,n._isTransitioning=!1,n._scrollbarWidth=0,n}u(r,i);var e=r.prototype;return e.toggle=function(e){return this._isShown?this.hide():this.show(e)},e.show=function(e){var t,n=this;this._isShown||this._isTransitioning||(this._element.classList.contains(kn)&&(this._isTransitioning=!0),t=q.trigger(this._element,yn,{relatedTarget:e}),this._isShown||t.defaultPrevented||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),q.on(this._element,wn,'[data-bs-dismiss="modal"]',function(e){return n.hide(e)}),q.on(this._dialog,En,function(){q.one(n._element,"mouseup.dismiss.bs.modal",function(e){e.target===n._element&&(n._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return n._showElement(e)})))},e.hide=function(e){var t=this;e&&e.preventDefault(),this._isShown&&!this._isTransitioning&&(q.trigger(this._element,"hide.bs.modal").defaultPrevented||(this._isShown=!1,(e=this._element.classList.contains(kn))&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),q.off(document,bn),this._element.classList.remove(An),q.off(this._element,wn),q.off(this._dialog,En),e?(e=p(this._element),q.one(this._element,"transitionend",function(e){return t._hideModal(e)}),g(this._element,e)):this._hideModal()))},e.dispose=function(){[window,this._element,this._dialog].forEach(function(e){return q.off(e,hn)}),i.prototype.dispose.call(this),q.off(document,bn),this._config=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},e.handleUpdate=function(){this._adjustDialog()},e._getConfig=function(e){return e=l({},gn,e),m("modal",e,mn),e},e._showElement=function(e){var t=this,n=this._element.classList.contains(kn),i=Z(".modal-body",this._dialog);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0,i&&(i.scrollTop=0),n&&y(this._element),this._element.classList.add(An),this._config.focus&&this._enforceFocus();i=function(){t._config.focus&&t._element.focus(),t._isTransitioning=!1,q.trigger(t._element,"shown.bs.modal",{relatedTarget:e})};n?(n=p(this._dialog),q.one(this._dialog,"transitionend",i),g(this._dialog,n)):i()},e._enforceFocus=function(){var t=this;q.off(document,bn),q.on(document,bn,function(e){document===e.target||t._element===e.target||t._element.contains(e.target)||t._element.focus()})},e._setEscapeEvent=function(){var t=this;this._isShown?q.on(this._element,xn,function(e){t._config.keyboard&&"Escape"===e.key?(e.preventDefault(),t.hide()):t._config.keyboard||"Escape"!==e.key||t._triggerBackdropTransition()}):q.off(this._element,xn)},e._setResizeEvent=function(){var e=this;this._isShown?q.on(window,_n,function(){return e._adjustDialog()}):q.off(window,_n)},e._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._showBackdrop(function(){document.body.classList.remove(Tn),e._resetAdjustments(),e._resetScrollbar(),q.trigger(e._element,vn)})},e._removeBackdrop=function(){this._backdrop.parentNode.removeChild(this._backdrop),this._backdrop=null},e._showBackdrop=function(e){var t,n=this,i=this._element.classList.contains(kn)?kn:"";this._isShown&&this._config.backdrop?(this._backdrop=document.createElement("div"),this._backdrop.className="modal-backdrop",i&&this._backdrop.classList.add(i),document.body.appendChild(this._backdrop),q.on(this._element,wn,function(e){n._ignoreBackdropClick?n._ignoreBackdropClick=!1:e.target===e.currentTarget&&("static"===n._config.backdrop?n._triggerBackdropTransition():n.hide())}),i&&y(this._backdrop),this._backdrop.classList.add(An),i?(t=p(this._backdrop),q.one(this._backdrop,"transitionend",e),g(this._backdrop,t)):e()):!this._isShown&&this._backdrop?(this._backdrop.classList.remove(An),i=function(){n._removeBackdrop(),e()},this._element.classList.contains(kn)?(t=p(this._backdrop),q.one(this._backdrop,"transitionend",i),g(this._backdrop,t)):i()):e()},e._triggerBackdropTransition=function(){var e,t,n=this;q.trigger(this._element,"hidePrevented.bs.modal").defaultPrevented||((e=this._element.scrollHeight>document.documentElement.clientHeight)||(this._element.style.overflowY="hidden"),this._element.classList.add(Sn),t=p(this._dialog),q.off(this._element,"transitionend"),q.one(this._element,"transitionend",function(){n._element.classList.remove(Sn),e||(q.one(n._element,"transitionend",function(){n._element.style.overflowY=""}),g(n._element,t))}),g(this._element,t),this._element.focus())},e._adjustDialog=function(){var e=this._element.scrollHeight>document.documentElement.clientHeight;(!this._isBodyOverflowing&&e&&!E||this._isBodyOverflowing&&!e&&E)&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),(this._isBodyOverflowing&&!e&&!E||!this._isBodyOverflowing&&e&&E)&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},e._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},e._checkScrollbar=function(){var e=document.body.getBoundingClientRect();this._isBodyOverflowing=Math.round(e.left+e.right)<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},e._setScrollbar=function(){var t=this;this._isBodyOverflowing&&(this._setElementAttributes(Cn,"paddingRight",function(e){return e+t._scrollbarWidth}),this._setElementAttributes(Ln,"marginRight",function(e){return e-t._scrollbarWidth}),this._setElementAttributes("body","paddingRight",function(e){return e+t._scrollbarWidth})),document.body.classList.add(Tn)},e._setElementAttributes=function(e,i,r){G(e).forEach(function(e){var t=e.style[i],n=window.getComputedStyle(e)[i];Q.setDataAttribute(e,i,t),e.style[i]=r(Number.parseFloat(n))+"px"})},e._resetScrollbar=function(){this._resetElementAttributes(Cn,"paddingRight"),this._resetElementAttributes(Ln,"marginRight"),this._resetElementAttributes("body","paddingRight")},e._resetElementAttributes=function(e,n){G(e).forEach(function(e){var t=Q.getDataAttribute(e,n);void 0===t&&e===document.body?e.style[n]="":(Q.removeDataAttribute(e,n),e.style[n]=t)})},e._getScrollbarWidth=function(){var e=document.createElement("div");e.className="modal-scrollbar-measure",document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t},r.jQueryInterface=function(n,i){return this.each(function(){var e=A(this,pn),t=l({},gn,Q.getDataAttributes(this),"object"==typeof n&&n?n:{}),e=e||new r(this,t);if("string"==typeof n){if(void 0===e[n])throw new TypeError('No method named "'+n+'"');e[n](i)}})},a(r,null,[{key:"Default",get:function(){return gn}},{key:"DATA_KEY",get:function(){return pn}}]),r}(Y);q.on(document,"click.bs.modal.data-api",'[data-bs-toggle="modal"]',function(e){var t=this,n=d(this);"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault(),q.one(n,yn,function(e){e.defaultPrevented||q.one(n,vn,function(){s(t)&&t.focus()})});var i=A(n,pn);i||(e=l({},Q.getDataAttributes(n),Q.getDataAttributes(this)),i=new Dn(n,e)),i.toggle(this)}),e("modal",Dn);var jn=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),On=/^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,Nn=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,Pt={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]};function Pn(e,o,t){if(!e.length)return e;if(t&&"function"==typeof t)return t(e);for(var t=(new window.DOMParser).parseFromString(e,"text/html"),s=Object.keys(o),a=(e=[]).concat.apply(e,t.body.querySelectorAll("*")),n=function(e,t){var n=a[e],i=n.nodeName.toLowerCase();if(!s.includes(i))return n.parentNode.removeChild(n),"continue";var e=(e=[]).concat.apply(e,n.attributes),r=[].concat(o["*"]||[],o[i]||[]);e.forEach(function(e){!function(e,t){var n=e.nodeName.toLowerCase();if(t.includes(n))return!jn.has(n)||Boolean(On.test(e.nodeValue)||Nn.test(e.nodeValue));for(var i=t.filter(function(e){return e instanceof RegExp}),r=0,o=i.length;r<o;r++)if(i[r].test(n))return!0;return!1}(e,r)&&n.removeAttribute(e.nodeName)})},i=0,r=a.length;i<r;i++)n(i);return t.body.innerHTML}var Hn="tooltip",Rn="bs.tooltip",Wn="."+Rn,In="bs-tooltip",Mn=new RegExp("(^|\\s)"+In+"\\S+","g"),Fn=new Set(["sanitize","allowList","sanitizeFn"]),qn={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(array|string|function)",container:"(string|element|boolean)",fallbackPlacements:"array",boundary:"(string|element)",customClass:"(string|function)",sanitize:"boolean",sanitizeFn:"(null|function)",allowList:"object",popperConfig:"(null|object|function)"},Yn={AUTO:"auto",TOP:"top",RIGHT:E?"left":"right",BOTTOM:"bottom",LEFT:E?"right":"left"},Xn={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:[0,0],container:!1,fallbackPlacements:["top","right","bottom","left"],boundary:"clippingParents",customClass:"",sanitize:!0,sanitizeFn:null,allowList:Pt,popperConfig:null},Bn={HIDE:"hide"+Wn,HIDDEN:"hidden"+Wn,SHOW:"show"+Wn,SHOWN:"shown"+Wn,INSERTED:"inserted"+Wn,CLICK:"click"+Wn,FOCUSIN:"focusin"+Wn,FOCUSOUT:"focusout"+Wn,MOUSEENTER:"mouseenter"+Wn,MOUSELEAVE:"mouseleave"+Wn},$n="fade",zn="show",Un="show",Kn="hover",Vn="focus",Rt=function(n){function i(e,t){if(void 0===Xt)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");return(e=n.call(this,e)||this)._isEnabled=!0,e._timeout=0,e._hoverState="",e._activeTrigger={},e._popper=null,e.config=e._getConfig(t),e.tip=null,e._setListeners(),e}u(i,n);var e=i.prototype;return e.enable=function(){this._isEnabled=!0},e.disable=function(){this._isEnabled=!1},e.toggleEnabled=function(){this._isEnabled=!this._isEnabled},e.toggle=function(e){this._isEnabled&&(e?((e=this._initializeOnDelegatedTarget(e))._activeTrigger.click=!e._activeTrigger.click,e._isWithActiveTrigger()?e._enter(null,e):e._leave(null,e)):this.getTipElement().classList.contains(zn)?this._leave(null,this):this._enter(null,this))},e.dispose=function(){clearTimeout(this._timeout),q.off(this._element,this.constructor.EVENT_KEY),q.off(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler),this.tip&&this.tip.parentNode&&this.tip.parentNode.removeChild(this.tip),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,this._popper&&this._popper.destroy(),this._popper=null,this.config=null,this.tip=null,n.prototype.dispose.call(this)},e.show=function(){var e,t,n,i,r=this;if("none"===this._element.style.display)throw new Error("Please use show on visible elements");this.isWithContent()&&this._isEnabled&&(n=q.trigger(this._element,this.constructor.Event.SHOW),e=(null===(t=c(this._element))?this._element.ownerDocument.documentElement:t).contains(this._element),!n.defaultPrevented&&e&&(t=this.getTipElement(),n=o(this.constructor.NAME),t.setAttribute("id",n),this._element.setAttribute("aria-describedby",n),this.setContent(),this.config.animation&&t.classList.add($n),e="function"==typeof this.config.placement?this.config.placement.call(this,t,this._element):this.config.placement,n=this._getAttachment(e),this._addAttachmentClass(n),e=this._getContainer(),k(t,this.constructor.DATA_KEY,this),this._element.ownerDocument.documentElement.contains(this.tip)||e.appendChild(t),q.trigger(this._element,this.constructor.Event.INSERTED),this._popper=Yt(this._element,t,this._getPopperConfig(n)),t.classList.add(zn),(n="function"==typeof this.config.customClass?this.config.customClass():this.config.customClass)&&(t=t.classList).add.apply(t,n.split(" ")),"ontouchstart"in document.documentElement&&(i=[]).concat.apply(i,document.body.children).forEach(function(e){q.on(e,"mouseover",v())}),n=function(){var e=r._hoverState;r._hoverState=null,q.trigger(r._element,r.constructor.Event.SHOWN),"out"===e&&r._leave(null,r)},this.tip.classList.contains($n)?(i=p(this.tip),q.one(this.tip,"transitionend",n),g(this.tip,i)):n()))},e.hide=function(){var e,t,n,i=this;this._popper&&(e=this.getTipElement(),t=function(){i._hoverState!==Un&&e.parentNode&&e.parentNode.removeChild(e),i._cleanTipClass(),i._element.removeAttribute("aria-describedby"),q.trigger(i._element,i.constructor.Event.HIDDEN),i._popper&&(i._popper.destroy(),i._popper=null)},q.trigger(this._element,this.constructor.Event.HIDE).defaultPrevented||(e.classList.remove(zn),"ontouchstart"in document.documentElement&&(n=[]).concat.apply(n,document.body.children).forEach(function(e){return q.off(e,"mouseover",v)}),this._activeTrigger.click=!1,this._activeTrigger[Vn]=!1,this._activeTrigger[Kn]=!1,this.tip.classList.contains($n)?(n=p(e),q.one(e,"transitionend",t),g(e,n)):t(),this._hoverState=""))},e.update=function(){null!==this._popper&&this._popper.update()},e.isWithContent=function(){return Boolean(this.getTitle())},e.getTipElement=function(){if(this.tip)return this.tip;var e=document.createElement("div");return e.innerHTML=this.config.template,this.tip=e.children[0],this.tip},e.setContent=function(){var e=this.getTipElement();this.setElementContent(Z(".tooltip-inner",e),this.getTitle()),e.classList.remove($n,zn)},e.setElementContent=function(e,t){if(null!==e)return"object"==typeof t&&h(t)?(t.jquery&&(t=t[0]),void(this.config.html?t.parentNode!==e&&(e.innerHTML="",e.appendChild(t)):e.textContent=t.textContent)):void(this.config.html?(this.config.sanitize&&(t=Pn(t,this.config.allowList,this.config.sanitizeFn)),e.innerHTML=t):e.textContent=t)},e.getTitle=function(){return this._element.getAttribute("data-bs-original-title")||("function"==typeof this.config.title?this.config.title.call(this._element):this.config.title)},e.updateAttachment=function(e){return"right"===e?"end":"left"===e?"start":e},e._initializeOnDelegatedTarget=function(e,t){var n=this.constructor.DATA_KEY;return(t=t||A(e.delegateTarget,n))||(t=new this.constructor(e.delegateTarget,this._getDelegateConfig()),k(e.delegateTarget,n,t)),t},e._getOffset=function(){var t=this,n=this.config.offset;return"string"==typeof n?n.split(",").map(function(e){return Number.parseInt(e,10)}):"function"==typeof n?function(e){return n(e,t._element)}:n},e._getPopperConfig=function(e){var t=this,e={placement:e,modifiers:[{name:"flip",options:{altBoundary:!0,fallbackPlacements:this.config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this.config.boundary}},{name:"arrow",options:{element:"."+this.constructor.NAME+"-arrow"}},{name:"onChange",enabled:!0,phase:"afterWrite",fn:function(e){return t._handlePopperPlacementChange(e)}}],onFirstUpdate:function(e){e.options.placement!==e.placement&&t._handlePopperPlacementChange(e)}};return l({},e,"function"==typeof this.config.popperConfig?this.config.popperConfig(e):this.config.popperConfig)},e._addAttachmentClass=function(e){this.getTipElement().classList.add(In+"-"+this.updateAttachment(e))},e._getContainer=function(){return!1===this.config.container?document.body:h(this.config.container)?this.config.container:Z(this.config.container)},e._getAttachment=function(e){return Yn[e.toUpperCase()]},e._setListeners=function(){var n=this;this.config.trigger.split(" ").forEach(function(e){var t;"click"===e?q.on(n._element,n.constructor.Event.CLICK,n.config.selector,function(e){return n.toggle(e)}):"manual"!==e&&(t=e===Kn?n.constructor.Event.MOUSEENTER:n.constructor.Event.FOCUSIN,e=e===Kn?n.constructor.Event.MOUSELEAVE:n.constructor.Event.FOCUSOUT,q.on(n._element,t,n.config.selector,function(e){return n._enter(e)}),q.on(n._element,e,n.config.selector,function(e){return n._leave(e)}))}),this._hideModalHandler=function(){n._element&&n.hide()},q.on(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler),this.config.selector?this.config=l({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},e._fixTitle=function(){var e=this._element.getAttribute("title"),t=typeof this._element.getAttribute("data-bs-original-title");!e&&"string"==t||(this._element.setAttribute("data-bs-original-title",e||""),!e||this._element.getAttribute("aria-label")||this._element.textContent||this._element.setAttribute("aria-label",e),this._element.setAttribute("title",""))},e._enter=function(e,t){t=this._initializeOnDelegatedTarget(e,t),e&&(t._activeTrigger["focusin"===e.type?Vn:Kn]=!0),t.getTipElement().classList.contains(zn)||t._hoverState===Un?t._hoverState=Un:(clearTimeout(t._timeout),t._hoverState=Un,t.config.delay&&t.config.delay.show?t._timeout=setTimeout(function(){t._hoverState===Un&&t.show()},t.config.delay.show):t.show())},e._leave=function(e,t){t=this._initializeOnDelegatedTarget(e,t),e&&(t._activeTrigger["focusout"===e.type?Vn:Kn]=!1),t._isWithActiveTrigger()||(clearTimeout(t._timeout),t._hoverState="out",t.config.delay&&t.config.delay.hide?t._timeout=setTimeout(function(){"out"===t._hoverState&&t.hide()},t.config.delay.hide):t.hide())},e._isWithActiveTrigger=function(){for(var e in this._activeTrigger)if(this._activeTrigger[e])return!0;return!1},e._getConfig=function(e){var t=Q.getDataAttributes(this._element);return Object.keys(t).forEach(function(e){Fn.has(e)&&delete t[e]}),e&&"object"==typeof e.container&&e.container.jquery&&(e.container=e.container[0]),"number"==typeof(e=l({},this.constructor.Default,t,"object"==typeof e&&e?e:{})).delay&&(e.delay={show:e.delay,hide:e.delay}),"number"==typeof e.title&&(e.title=e.title.toString()),"number"==typeof e.content&&(e.content=e.content.toString()),m(Hn,e,this.constructor.DefaultType),e.sanitize&&(e.template=Pn(e.template,e.allowList,e.sanitizeFn)),e},e._getDelegateConfig=function(){var e={};if(this.config)for(var t in this.config)this.constructor.Default[t]!==this.config[t]&&(e[t]=this.config[t]);return e},e._cleanTipClass=function(){var t=this.getTipElement(),e=t.getAttribute("class").match(Mn);null!==e&&0<e.length&&e.map(function(e){return e.trim()}).forEach(function(e){return t.classList.remove(e)})},e._handlePopperPlacementChange=function(e){e=e.state;e&&(this.tip=e.elements.popper,this._cleanTipClass(),this._addAttachmentClass(this._getAttachment(e.placement)))},i.jQueryInterface=function(n){return this.each(function(){var e=A(this,Rn),t="object"==typeof n&&n;if((e||!/dispose|hide/.test(n))&&(e=e||new i(this,t),"string"==typeof n)){if(void 0===e[n])throw new TypeError('No method named "'+n+'"');e[n]()}})},a(i,null,[{key:"Default",get:function(){return Xn}},{key:"NAME",get:function(){return Hn}},{key:"DATA_KEY",get:function(){return Rn}},{key:"Event",get:function(){return Bn}},{key:"EVENT_KEY",get:function(){return Wn}},{key:"DefaultType",get:function(){return qn}}]),i}(Y);e(Hn,Rt);var Qn="popover",Gn="bs.popover",Zn="."+Gn,Jn="bs-popover",ei=new RegExp("(^|\\s)"+Jn+"\\S+","g"),ti=l({},Rt.Default,{placement:"right",offset:[0,8],trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),ni=l({},Rt.DefaultType,{content:"(string|element|function)"}),ii={HIDE:"hide"+Zn,HIDDEN:"hidden"+Zn,SHOW:"show"+Zn,SHOWN:"shown"+Zn,INSERTED:"inserted"+Zn,CLICK:"click"+Zn,FOCUSIN:"focusin"+Zn,FOCUSOUT:"focusout"+Zn,MOUSEENTER:"mouseenter"+Zn,MOUSELEAVE:"mouseleave"+Zn},Ht=function(e){function i(){return e.apply(this,arguments)||this}u(i,e);var t=i.prototype;return t.isWithContent=function(){return this.getTitle()||this._getContent()},t.setContent=function(){var e=this.getTipElement();this.setElementContent(Z(".popover-header",e),this.getTitle());var t=this._getContent();"function"==typeof t&&(t=t.call(this._element)),this.setElementContent(Z(".popover-body",e),t),e.classList.remove("fade","show")},t._addAttachmentClass=function(e){this.getTipElement().classList.add(Jn+"-"+this.updateAttachment(e))},t._getContent=function(){return this._element.getAttribute("data-bs-content")||this.config.content},t._cleanTipClass=function(){var t=this.getTipElement(),e=t.getAttribute("class").match(ei);null!==e&&0<e.length&&e.map(function(e){return e.trim()}).forEach(function(e){return t.classList.remove(e)})},i.jQueryInterface=function(n){return this.each(function(){var e=A(this,Gn),t="object"==typeof n?n:null;if((e||!/dispose|hide/.test(n))&&(e||(e=new i(this,t),k(this,Gn,e)),"string"==typeof n)){if(void 0===e[n])throw new TypeError('No method named "'+n+'"');e[n]()}})},a(i,null,[{key:"Default",get:function(){return ti}},{key:"NAME",get:function(){return Qn}},{key:"DATA_KEY",get:function(){return Gn}},{key:"Event",get:function(){return ii}},{key:"EVENT_KEY",get:function(){return Zn}},{key:"DefaultType",get:function(){return ni}}]),i}(Rt);e(Qn,Ht);var ri="scrollspy",oi="bs.scrollspy",si="."+oi,ai={offset:10,method:"auto",target:""},li={offset:"number",method:"string",target:"(string|element)"},ci="dropdown-item",ui="active",fi=".nav-link",di=".list-group-item",pi="position",hi=function(i){function n(e,t){var n=i.call(this,e)||this;return n._scrollElement="BODY"===e.tagName?window:e,n._config=n._getConfig(t),n._selector=n._config.target+" "+fi+", "+n._config.target+" "+di+", "+n._config.target+" ."+ci,n._offsets=[],n._targets=[],n._activeTarget=null,n._scrollHeight=0,q.on(n._scrollElement,"scroll.bs.scrollspy",function(){return n._process()}),n.refresh(),n._process(),n}u(n,i);var e=n.prototype;return e.refresh=function(){var t=this,e=this._scrollElement===this._scrollElement.window?"offset":pi,i="auto"===this._config.method?e:this._config.method,r=i===pi?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),G(this._selector).map(function(e){var t=f(e),n=t?Z(t):null;if(n){e=n.getBoundingClientRect();if(e.width||e.height)return[Q[i](n).top+r,t]}return null}).filter(function(e){return e}).sort(function(e,t){return e[0]-t[0]}).forEach(function(e){t._offsets.push(e[0]),t._targets.push(e[1])})},e.dispose=function(){i.prototype.dispose.call(this),q.off(this._scrollElement,si),this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},e._getConfig=function(e){var t;return"string"!=typeof(e=l({},ai,"object"==typeof e&&e?e:{})).target&&h(e.target)&&((t=e.target.id)||(t=o(ri),e.target.id=t),e.target="#"+t),m(ri,e,li),e},e._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},e._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},e._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},e._process=function(){var e=this._getScrollTop()+this._config.offset,t=this._getScrollHeight(),n=this._config.offset+t-this._getOffsetHeight();if(this._scrollHeight!==t&&this.refresh(),n<=e){n=this._targets[this._targets.length-1];this._activeTarget!==n&&this._activate(n)}else{if(this._activeTarget&&e<this._offsets[0]&&0<this._offsets[0])return this._activeTarget=null,void this._clear();for(var i=this._offsets.length;i--;)this._activeTarget!==this._targets[i]&&e>=this._offsets[i]&&(void 0===this._offsets[i+1]||e<this._offsets[i+1])&&this._activate(this._targets[i])}},e._activate=function(t){this._activeTarget=t,this._clear();var e=this._selector.split(",").map(function(e){return e+'[data-bs-target="'+t+'"],'+e+'[href="'+t+'"]'}),e=Z(e.join(","));e.classList.contains(ci)?(Z(".dropdown-toggle",e.closest(".dropdown")).classList.add(ui),e.classList.add(ui)):(e.classList.add(ui),ee(e,".nav, .list-group").forEach(function(e){te(e,fi+", "+di).forEach(function(e){return e.classList.add(ui)}),te(e,".nav-item").forEach(function(e){J(e,fi).forEach(function(e){return e.classList.add(ui)})})})),q.trigger(this._scrollElement,"activate.bs.scrollspy",{relatedTarget:t})},e._clear=function(){G(this._selector).filter(function(e){return e.classList.contains(ui)}).forEach(function(e){return e.classList.remove(ui)})},n.jQueryInterface=function(t){return this.each(function(){var e=(e=A(this,oi))||new n(this,"object"==typeof t&&t);if("string"==typeof t){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t]()}})},a(n,null,[{key:"Default",get:function(){return ai}},{key:"DATA_KEY",get:function(){return oi}}]),n}(Y);q.on(window,"load.bs.scrollspy.data-api",function(){G('[data-bs-spy="scroll"]').forEach(function(e){return new hi(e,Q.getDataAttributes(e))})}),e(ri,hi);var gi="bs.tab",mi="active",vi=".active",yi=":scope > li > .active",bi=function(e){function n(){return e.apply(this,arguments)||this}u(n,e);var t=n.prototype;return t.show=function(){var e,t,n,i,r=this;this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains(mi)||this._element.classList.contains("disabled")||(e=d(this._element),(i=this._element.closest(".nav, .list-group"))&&(n="UL"===i.nodeName||"OL"===i.nodeName?yi:vi,t=(t=G(n,i))[t.length-1]),n=t?q.trigger(t,"hide.bs.tab",{relatedTarget:this._element}):null,q.trigger(this._element,"show.bs.tab",{relatedTarget:t}).defaultPrevented||null!==n&&n.defaultPrevented||(this._activate(this._element,i),i=function(){q.trigger(t,"hidden.bs.tab",{relatedTarget:r._element}),q.trigger(r._element,"shown.bs.tab",{relatedTarget:t})},e?this._activate(e,e.parentNode,i):i()))},t._activate=function(e,t,n){var i=this,r=(!t||"UL"!==t.nodeName&&"OL"!==t.nodeName?J(t,vi):G(yi,t))[0],o=n&&r&&r.classList.contains("fade"),t=function(){return i._transitionComplete(e,r,n)};r&&o?(o=p(r),r.classList.remove("show"),q.one(r,"transitionend",t),g(r,o)):t()},t._transitionComplete=function(e,t,n){var i;t&&(t.classList.remove(mi),(i=Z(":scope > .dropdown-menu .active",t.parentNode))&&i.classList.remove(mi),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!1)),e.classList.add(mi),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),y(e),e.classList.contains("fade")&&e.classList.add("show"),e.parentNode&&e.parentNode.classList.contains("dropdown-menu")&&(e.closest(".dropdown")&&G(".dropdown-toggle").forEach(function(e){return e.classList.add(mi)}),e.setAttribute("aria-expanded",!0)),n&&n()},n.jQueryInterface=function(t){return this.each(function(){var e=A(this,gi)||new n(this);if("string"==typeof t){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t]()}})},a(n,null,[{key:"DATA_KEY",get:function(){return gi}}]),n}(Y);q.on(document,"click.bs.tab.data-api",'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',function(e){e.preventDefault(),(A(this,gi)||new bi(this)).show()}),e("tab",bi);var _i="bs.toast",Pt="."+_i,wi="click.dismiss"+Pt,xi="show",Ei="showing",Ti={animation:"boolean",autohide:"boolean",delay:"number"},ki={animation:!0,autohide:!0,delay:5e3},Y=function(n){function i(e,t){e=n.call(this,e)||this;return e._config=e._getConfig(t),e._timeout=null,e._setListeners(),e}u(i,n);var e=i.prototype;return e.show=function(){var e,t,n=this;q.trigger(this._element,"show.bs.toast").defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),e=function(){n._element.classList.remove(Ei),n._element.classList.add(xi),q.trigger(n._element,"shown.bs.toast"),n._config.autohide&&(n._timeout=setTimeout(function(){n.hide()},n._config.delay))},this._element.classList.remove("hide"),y(this._element),this._element.classList.add(Ei),this._config.animation?(t=p(this._element),q.one(this._element,"transitionend",e),g(this._element,t)):e())},e.hide=function(){var e,t,n=this;this._element.classList.contains(xi)&&(q.trigger(this._element,"hide.bs.toast").defaultPrevented||(e=function(){n._element.classList.add("hide"),q.trigger(n._element,"hidden.bs.toast")},this._element.classList.remove(xi),this._config.animation?(t=p(this._element),q.one(this._element,"transitionend",e),g(this._element,t)):e()))},e.dispose=function(){this._clearTimeout(),this._element.classList.contains(xi)&&this._element.classList.remove(xi),q.off(this._element,wi),n.prototype.dispose.call(this),this._config=null},e._getConfig=function(e){return e=l({},ki,Q.getDataAttributes(this._element),"object"==typeof e&&e?e:{}),m("toast",e,this.constructor.DefaultType),e},e._setListeners=function(){var e=this;q.on(this._element,wi,'[data-bs-dismiss="toast"]',function(){return e.hide()})},e._clearTimeout=function(){clearTimeout(this._timeout),this._timeout=null},i.jQueryInterface=function(t){return this.each(function(){var e=(e=A(this,_i))||new i(this,"object"==typeof t&&t);if("string"==typeof t){if(void 0===e[t])throw new TypeError('No method named "'+t+'"');e[t](this)}})},a(i,null,[{key:"DefaultType",get:function(){return Ti}},{key:"Default",get:function(){return ki}},{key:"DATA_KEY",get:function(){return _i}}]),i}(Y);return e("toast",Y),{Alert:B,Button:U,Carousel:pe,Collapse:Ee,Dropdown:dn,Modal:Dn,Popover:Ht,ScrollSpy:hi,Tab:bi,Toast:Y,Tooltip:Rt}}),function i(r,o,s){function a(n,e){if(!o[n]){if(!r[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}t=o[n]={exports:{}};r[n][0].call(t.exports,function(e){var t=r[n][1][e];return a(t||e)},t,t.exports,i,r,o,s)}return o[n].exports}for(var l="function"==typeof require&&require,e=0;e<s.length;e++)a(s[e]);return a}({1:[function(e,t,n){"use strict";var i=e("../main"),r=e("../plugin/instances");function o(e){e.fn.perfectScrollbar=function(t){return this.each(function(){var e;"object"==typeof t||void 0===t?(e=t,r.get(this)||i.initialize(this,e)):"update"===(e=t)?i.update(this):"destroy"===e&&i.destroy(this)})}}"function"==typeof define&&define.amd?define(["jquery"],o):void 0!==(e=window.jQuery||window.$)&&o(e),t.exports=o},{"../main":7,"../plugin/instances":18}],2:[function(e,t,n){"use strict";n.add=function(e,t){var n;e.classList?e.classList.add(t):(n=t,(e=(t=e).className.split(" ")).indexOf(n)<0&&e.push(n),t.className=e.join(" "))},n.remove=function(e,t){var n;e.classList?e.classList.remove(t):(n=t,e=(t=e).className.split(" "),0<=(n=e.indexOf(n))&&e.splice(n,1),t.className=e.join(" "))},n.list=function(e){return e.classList?Array.prototype.slice.apply(e.classList):e.className.split(" ")}},{}],3:[function(e,t,n){"use strict";var i={};i.e=function(e,t){e=document.createElement(e);return e.className=t,e},i.appendTo=function(e,t){return t.appendChild(e),e},i.css=function(e,t,n){return"object"==typeof t?function(e,t){for(var n in t){var i=t[n];"number"==typeof i&&(i=i.toString()+"px"),e.style[n]=i}return e}(e,t):void 0===n?(i=e,r=t,window.getComputedStyle(i)[r]):(e=e,t=t,"number"==typeof(n=n)&&(n=n.toString()+"px"),e.style[t]=n,e);var i,r},i.matches=function(e,t){return void 0!==e.matches?e.matches(t):void 0!==e.matchesSelector?e.matchesSelector(t):void 0!==e.webkitMatchesSelector?e.webkitMatchesSelector(t):void 0!==e.mozMatchesSelector?e.mozMatchesSelector(t):void 0!==e.msMatchesSelector?e.msMatchesSelector(t):void 0},i.remove=function(e){void 0!==e.remove?e.remove():e.parentNode&&e.parentNode.removeChild(e)},i.queryChildren=function(e,t){return Array.prototype.filter.call(e.childNodes,function(e){return i.matches(e,t)})},t.exports=i},{}],4:[function(e,t,n){"use strict";function i(e){this.element=e,this.events={}}i.prototype.bind=function(e,t){void 0===this.events[e]&&(this.events[e]=[]),this.events[e].push(t),this.element.addEventListener(e,t,!1)},i.prototype.unbind=function(t,n){var i=void 0!==n;this.events[t]=this.events[t].filter(function(e){return i&&e!==n||(this.element.removeEventListener(t,e,!1),!1)},this)},i.prototype.unbindAll=function(){for(var e in this.events)this.unbind(e)};function r(){this.eventElements=[]}r.prototype.eventElement=function(t){var e=this.eventElements.filter(function(e){return e.element===t})[0];return void 0===e&&(e=new i(t),this.eventElements.push(e)),e},r.prototype.bind=function(e,t,n){this.eventElement(e).bind(t,n)},r.prototype.unbind=function(e,t,n){this.eventElement(e).unbind(t,n)},r.prototype.unbindAll=function(){for(var e=0;e<this.eventElements.length;e++)this.eventElements[e].unbindAll()},r.prototype.once=function(e,t,n){var i=this.eventElement(e),r=function(e){i.unbind(t,r),n(e)};i.bind(t,r)},t.exports=r},{}],5:[function(e,t,n){"use strict";function i(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}t.exports=function(){return i()+i()+"-"+i()+"-"+i()+"-"+i()+"-"+i()+i()+i()}},{}],6:[function(e,t,n){"use strict";var r=e("./class"),i=e("./dom"),o=n.toInt=function(e){return parseInt(e,10)||0},s=n.clone=function(e){if(e){if(e.constructor===Array)return e.map(s);if("object"!=typeof e)return e;var t,n={};for(t in e)n[t]=s(e[t]);return n}return null};n.extend=function(e,t){var n,i=s(e);for(n in t)i[n]=s(t[n]);return i},n.isEditable=function(e){return i.matches(e,"input,[contenteditable]")||i.matches(e,"select,[contenteditable]")||i.matches(e,"textarea,[contenteditable]")||i.matches(e,"button,[contenteditable]")},n.removePsClasses=function(e){for(var t=r.list(e),n=0;n<t.length;n++){var i=t[n];0===i.indexOf("ps-")&&r.remove(e,i)}},n.outerWidth=function(e){return o(i.css(e,"width"))+o(i.css(e,"paddingLeft"))+o(i.css(e,"paddingRight"))+o(i.css(e,"borderLeftWidth"))+o(i.css(e,"borderRightWidth"))},n.startScrolling=function(e,t){r.add(e,"ps-in-scrolling"),void 0!==t?r.add(e,"ps-"+t):(r.add(e,"ps-x"),r.add(e,"ps-y"))},n.stopScrolling=function(e,t){r.remove(e,"ps-in-scrolling"),void 0!==t?r.remove(e,"ps-"+t):(r.remove(e,"ps-x"),r.remove(e,"ps-y"))},n.env={isWebKit:"WebkitAppearance"in document.documentElement.style,supportsTouch:"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,supportsIePointer:null!==window.navigator.msMaxTouchPoints}},{"./class":2,"./dom":3}],7:[function(e,t,n){"use strict";var i=e("./plugin/destroy"),r=e("./plugin/initialize"),e=e("./plugin/update");t.exports={initialize:r,update:e,destroy:i}},{"./plugin/destroy":9,"./plugin/initialize":17,"./plugin/update":21}],8:[function(e,t,n){"use strict";t.exports={handlers:["click-rail","drag-scrollbar","keyboard","wheel","touch"],maxScrollbarLength:null,minScrollbarLength:null,scrollXMarginOffset:0,scrollYMarginOffset:0,suppressScrollX:!1,suppressScrollY:!1,swipePropagation:!0,useBothWheelAxes:!1,wheelPropagation:!1,wheelSpeed:1,theme:"default"}},{}],9:[function(e,t,n){"use strict";var i=e("../lib/helper"),r=e("../lib/dom"),o=e("./instances");t.exports=function(e){var t=o.get(e);t&&(t.event.unbindAll(),r.remove(t.scrollbarX),r.remove(t.scrollbarY),r.remove(t.scrollbarXRail),r.remove(t.scrollbarYRail),i.removePsClasses(e),o.remove(e))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18}],10:[function(e,t,n){"use strict";var i=e("../instances"),o=e("../update-geometry"),s=e("../update-scroll");function r(n,i){function r(e){return e.getBoundingClientRect()}function e(e){e.stopPropagation()}i.event.bind(i.scrollbarY,"click",e),i.event.bind(i.scrollbarYRail,"click",function(e){var t=e.pageY-window.pageYOffset-r(i.scrollbarYRail).top>i.scrollbarYTop?1:-1;s(n,"top",n.scrollTop+t*i.containerHeight),o(n),e.stopPropagation()}),i.event.bind(i.scrollbarX,"click",e),i.event.bind(i.scrollbarXRail,"click",function(e){var t=e.pageX-window.pageXOffset-r(i.scrollbarXRail).left>i.scrollbarXLeft?1:-1;s(n,"left",n.scrollLeft+t*i.containerWidth),o(n),e.stopPropagation()})}t.exports=function(e){r(e,i.get(e))}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],11:[function(e,t,n){"use strict";var a=e("../../lib/helper"),l=e("../../lib/dom"),i=e("../instances"),c=e("../update-geometry"),u=e("../update-scroll");function r(i,r){var o=null,s=null;function t(e){var t,n;t=e.pageX-s,n=o+t*r.railXRatio,t=Math.max(0,r.scrollbarXRail.getBoundingClientRect().left)+r.railXRatio*(r.railXWidth-r.scrollbarXWidth),r.scrollbarXLeft=n<0?0:t<n?t:n,n=a.toInt(r.scrollbarXLeft*(r.contentWidth-r.containerWidth)/(r.containerWidth-r.railXRatio*r.scrollbarXWidth))-r.negativeScrollAdjustment,u(i,"left",n),c(i),e.stopPropagation(),e.preventDefault()}function n(){a.stopScrolling(i,"x"),r.event.unbind(r.ownerDocument,"mousemove",t)}r.event.bind(r.scrollbarX,"mousedown",function(e){s=e.pageX,o=a.toInt(l.css(r.scrollbarX,"left"))*r.railXRatio,a.startScrolling(i,"x"),r.event.bind(r.ownerDocument,"mousemove",t),r.event.once(r.ownerDocument,"mouseup",n),e.stopPropagation(),e.preventDefault()})}function o(i,r){var o=null,s=null;function t(e){var t,n;t=e.pageY-s,n=o+t*r.railYRatio,t=Math.max(0,r.scrollbarYRail.getBoundingClientRect().top)+r.railYRatio*(r.railYHeight-r.scrollbarYHeight),r.scrollbarYTop=n<0?0:t<n?t:n,n=a.toInt(r.scrollbarYTop*(r.contentHeight-r.containerHeight)/(r.containerHeight-r.railYRatio*r.scrollbarYHeight)),u(i,"top",n),c(i),e.stopPropagation(),e.preventDefault()}function n(){a.stopScrolling(i,"y"),r.event.unbind(r.ownerDocument,"mousemove",t)}r.event.bind(r.scrollbarY,"mousedown",function(e){s=e.pageY,o=a.toInt(l.css(r.scrollbarY,"top"))*r.railYRatio,a.startScrolling(i,"y"),r.event.bind(r.ownerDocument,"mousemove",t),r.event.once(r.ownerDocument,"mouseup",n),e.stopPropagation(),e.preventDefault()})}t.exports=function(e){var t=i.get(e);r(e,t),o(e,t)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],12:[function(e,t,n){"use strict";var l=e("../../lib/helper"),c=e("../../lib/dom"),i=e("../instances"),u=e("../update-geometry"),f=e("../update-scroll");function r(o,s){var a=!1;s.event.bind(o,"mouseenter",function(){a=!0}),s.event.bind(o,"mouseleave",function(){a=!1});s.event.bind(s.ownerDocument,"keydown",function(e){if(!(e.isDefaultPrevented&&e.isDefaultPrevented()||e.defaultPrevented)){var t=c.matches(s.scrollbarX,":focus")||c.matches(s.scrollbarY,":focus");if(a||t){var n=document.activeElement||s.ownerDocument.activeElement;if(n){if("IFRAME"===n.tagName)n=n.contentDocument.activeElement;else for(;n.shadowRoot;)n=n.shadowRoot.activeElement;if(l.isEditable(n))return}var i=0,r=0;switch(e.which){case 37:i=e.metaKey?-s.contentWidth:e.altKey?-s.containerWidth:-30;break;case 38:r=e.metaKey?s.contentHeight:e.altKey?s.containerHeight:30;break;case 39:i=e.metaKey?s.contentWidth:e.altKey?s.containerWidth:30;break;case 40:r=e.metaKey?-s.contentHeight:e.altKey?-s.containerHeight:-30;break;case 33:r=90;break;case 32:r=e.shiftKey?90:-90;break;case 34:r=-90;break;case 35:r=e.ctrlKey?-s.contentHeight:-s.containerHeight;break;case 36:r=e.ctrlKey?o.scrollTop:s.containerHeight;break;default:return}f(o,"top",o.scrollTop-r),f(o,"left",o.scrollLeft+i),u(o),function(e,t){var n=o.scrollTop;if(0===e){if(!s.scrollbarYActive)return!1;if(0===n&&0<t||n>=s.contentHeight-s.containerHeight&&t<0)return!s.settings.wheelPropagation}if(n=o.scrollLeft,0===t){if(!s.scrollbarXActive)return!1;if(0===n&&e<0||n>=s.contentWidth-s.containerWidth&&0<e)return!s.settings.wheelPropagation}return!0}(i,r)&&e.preventDefault()}}})}t.exports=function(e){r(e,i.get(e))}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],13:[function(e,t,n){"use strict";var i=e("../instances"),a=e("../update-geometry"),l=e("../update-scroll");function r(r,o){var s=!1;function e(e){var t,n=(n=(t=e).deltaX,i=-1*t.deltaY,void 0!==n&&void 0!==i||(n=-1*t.wheelDeltaX/6,i=t.wheelDeltaY/6),t.deltaMode&&1===t.deltaMode&&(n*=10,i*=10),n!=n&&i!=i&&(n=0,i=t.wheelDelta),t.shiftKey?[-i,-n]:[n,i]),i=n[0],n=n[1];!function(e,t){var n=r.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");if(n){if(!window.getComputedStyle(n).overflow.match(/(scroll|auto)/))return;var i=n.scrollHeight-n.clientHeight;if(0<i&&!(0===n.scrollTop&&0<t||n.scrollTop===i&&t<0))return 1;t=n.scrollLeft-n.clientWidth;if(0<t&&!(0===n.scrollLeft&&e<0||n.scrollLeft===t&&0<e))return 1}}(i,n)&&(s=!1,o.settings.useBothWheelAxes?o.scrollbarYActive&&!o.scrollbarXActive?(l(r,"top",n?r.scrollTop-n*o.settings.wheelSpeed:r.scrollTop+i*o.settings.wheelSpeed),s=!0):o.scrollbarXActive&&!o.scrollbarYActive&&(l(r,"left",i?r.scrollLeft+i*o.settings.wheelSpeed:r.scrollLeft-n*o.settings.wheelSpeed),s=!0):(l(r,"top",r.scrollTop-n*o.settings.wheelSpeed),l(r,"left",r.scrollLeft+i*o.settings.wheelSpeed)),a(r),(s=s||function(e,t){var n=r.scrollTop;if(0===e){if(!o.scrollbarYActive)return!1;if(0===n&&0<t||n>=o.contentHeight-o.containerHeight&&t<0)return!o.settings.wheelPropagation}if(n=r.scrollLeft,0===t){if(!o.scrollbarXActive)return!1;if(0===n&&e<0||n>=o.contentWidth-o.containerWidth&&0<e)return!o.settings.wheelPropagation}return!0}(i,n))&&(e.stopPropagation(),e.preventDefault()))}void 0!==window.onwheel?o.event.bind(r,"wheel",e):void 0!==window.onmousewheel&&o.event.bind(r,"mousewheel",e)}t.exports=function(e){r(e,i.get(e))}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],14:[function(e,t,n){"use strict";var i=e("../instances"),r=e("../update-geometry");t.exports=function(e){var t,n=i.get(e);t=e,n.event.bind(t,"scroll",function(){r(t)})}},{"../instances":18,"../update-geometry":19}],15:[function(e,t,n){"use strict";var f=e("../../lib/helper"),d=e("../instances"),p=e("../update-geometry"),h=e("../update-scroll");function i(s,e){var a=null,l={top:0,left:0};function c(){a&&(clearInterval(a),a=null),f.stopScrolling(s)}var u=!1;e.event.bind(e.ownerDocument,"selectionchange",function(){var e;s.contains(0===(e=window.getSelection?window.getSelection():document.getSelection?document.getSelection():"").toString().length?null:e.getRangeAt(0).commonAncestorContainer)?u=!0:(u=!1,c())}),e.event.bind(window,"mouseup",function(){u&&(u=!1,c())}),e.event.bind(window,"keyup",function(){u&&(u=!1,c())}),e.event.bind(window,"mousemove",function(e){var t,n,i,r,o;u&&(t=e.pageX,n=e.pageY,i=s.offsetLeft,r=s.offsetLeft+s.offsetWidth,o=s.offsetTop,e=s.offsetTop+s.offsetHeight,t<i+3?(l.left=-5,f.startScrolling(s,"x")):r-3<t?(l.left=5,f.startScrolling(s,"x")):l.left=0,n<o+3?(l.top=o+3-n<5?-5:-20,f.startScrolling(s,"y")):e-3<n?(l.top=n-e+3<5?5:20,f.startScrolling(s,"y")):l.top=0,0===l.top&&0===l.left?c():a=a||setInterval(function(){d.get(s)?(h(s,"top",s.scrollTop+l.top),h(s,"left",s.scrollLeft+l.left),p(s)):clearInterval(a)},50))})}t.exports=function(e){i(e,d.get(e))}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],16:[function(e,t,n){"use strict";var i=e("../../lib/helper"),y=e("../instances"),b=e("../update-geometry"),_=e("../update-scroll");function r(s,a,e,t){function o(e,t){_(s,"top",s.scrollTop-t),_(s,"left",s.scrollLeft-e),b(s)}var l={},c=0,u={},n=null,f=!1,d=!1;function i(){f=!0}function r(){f=!1}function p(e){return e.targetTouches?e.targetTouches[0]:e}function h(e){return e.targetTouches&&1===e.targetTouches.length||!(!e.pointerType||"mouse"===e.pointerType||e.pointerType===e.MSPOINTER_TYPE_MOUSE)}function g(e){var t;h(e)&&(d=!0,t=p(e),l.pageX=t.pageX,l.pageY=t.pageY,c=(new Date).getTime(),null!==n&&clearInterval(n),e.stopPropagation())}function m(e){var t,n,i,r;!d&&a.settings.swipePropagation&&g(e),!f&&d&&h(e)&&(o(t=(r={pageX:(i=p(e)).pageX,pageY:i.pageY}).pageX-l.pageX,n=r.pageY-l.pageY),l=r,0<(r=(i=(new Date).getTime())-c)&&(u.x=t/r,u.y=n/r,c=i),function(e,t){var n=s.scrollTop,i=s.scrollLeft,r=Math.abs(e),o=Math.abs(t);if(r<o){if(t<0&&n===a.contentHeight-a.containerHeight||0<t&&0===n)return!a.settings.swipePropagation}else if(o<r&&(e<0&&i===a.contentWidth-a.containerWidth||0<e&&0===i))return!a.settings.swipePropagation;return 1}(t,n)&&(e.stopPropagation(),e.preventDefault()))}function v(){!f&&d&&(d=!1,clearInterval(n),n=setInterval(function(){!y.get(s)||!u.x&&!u.y||Math.abs(u.x)<.01&&Math.abs(u.y)<.01?clearInterval(n):(o(30*u.x,30*u.y),u.x*=.8,u.y*=.8)},10))}e?(a.event.bind(window,"touchstart",i),a.event.bind(window,"touchend",r),a.event.bind(s,"touchstart",g),a.event.bind(s,"touchmove",m),a.event.bind(s,"touchend",v)):t&&(window.PointerEvent?(a.event.bind(window,"pointerdown",i),a.event.bind(window,"pointerup",r),a.event.bind(s,"pointerdown",g),a.event.bind(s,"pointermove",m),a.event.bind(s,"pointerup",v)):window.MSPointerEvent&&(a.event.bind(window,"MSPointerDown",i),a.event.bind(window,"MSPointerUp",r),a.event.bind(s,"MSPointerDown",g),a.event.bind(s,"MSPointerMove",m),a.event.bind(s,"MSPointerUp",v)))}t.exports=function(e){(i.env.supportsTouch||i.env.supportsIePointer)&&r(e,y.get(e),i.env.supportsTouch,i.env.supportsIePointer)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],17:[function(e,t,n){"use strict";var i=e("../lib/helper"),r=e("../lib/class"),o=e("./instances"),s=e("./update-geometry"),a={"click-rail":e("./handler/click-rail"),"drag-scrollbar":e("./handler/drag-scrollbar"),keyboard:e("./handler/keyboard"),wheel:e("./handler/mouse-wheel"),touch:e("./handler/touch"),selection:e("./handler/selection")},l=e("./handler/native-scroll");t.exports=function(t,e){e="object"==typeof e?e:{},r.add(t,"ps-container");var n=o.add(t);n.settings=i.extend(n.settings,e),r.add(t,"ps-theme-"+n.settings.theme),n.settings.handlers.forEach(function(e){a[e](t)}),l(t),s(t)}},{"../lib/class":2,"../lib/helper":6,"./handler/click-rail":10,"./handler/drag-scrollbar":11,"./handler/keyboard":12,"./handler/mouse-wheel":13,"./handler/native-scroll":14,"./handler/selection":15,"./handler/touch":16,"./instances":18,"./update-geometry":19}],18:[function(e,t,n){"use strict";var s=e("../lib/helper"),a=e("../lib/class"),l=e("./default-setting"),c=e("../lib/dom"),u=e("../lib/event-manager"),i=e("../lib/guid"),r={};function o(e){var t,n,i=this;function r(){a.add(e,"ps-focus")}function o(){a.remove(e,"ps-focus")}i.settings=s.clone(l),i.containerWidth=null,i.containerHeight=null,i.contentWidth=null,i.contentHeight=null,i.isRtl="rtl"===c.css(e,"direction"),i.isNegativeScroll=(n=e.scrollLeft,e.scrollLeft=-1,t=e.scrollLeft<0,e.scrollLeft=n,t),i.negativeScrollAdjustment=i.isNegativeScroll?e.scrollWidth-e.clientWidth:0,i.event=new u,i.ownerDocument=e.ownerDocument||document,i.scrollbarXRail=c.appendTo(c.e("div","ps-scrollbar-x-rail"),e),i.scrollbarX=c.appendTo(c.e("div","ps-scrollbar-x"),i.scrollbarXRail),i.scrollbarX.setAttribute("tabindex",0),i.event.bind(i.scrollbarX,"focus",r),i.event.bind(i.scrollbarX,"blur",o),i.scrollbarXActive=null,i.scrollbarXWidth=null,i.scrollbarXLeft=null,i.scrollbarXBottom=s.toInt(c.css(i.scrollbarXRail,"bottom")),i.isScrollbarXUsingBottom=i.scrollbarXBottom==i.scrollbarXBottom,i.scrollbarXTop=i.isScrollbarXUsingBottom?null:s.toInt(c.css(i.scrollbarXRail,"top")),i.railBorderXWidth=s.toInt(c.css(i.scrollbarXRail,"borderLeftWidth"))+s.toInt(c.css(i.scrollbarXRail,"borderRightWidth")),c.css(i.scrollbarXRail,"display","block"),i.railXMarginWidth=s.toInt(c.css(i.scrollbarXRail,"marginLeft"))+s.toInt(c.css(i.scrollbarXRail,"marginRight")),c.css(i.scrollbarXRail,"display",""),i.railXWidth=null,i.railXRatio=null,i.scrollbarYRail=c.appendTo(c.e("div","ps-scrollbar-y-rail"),e),i.scrollbarY=c.appendTo(c.e("div","ps-scrollbar-y"),i.scrollbarYRail),i.scrollbarY.setAttribute("tabindex",0),i.event.bind(i.scrollbarY,"focus",r),i.event.bind(i.scrollbarY,"blur",o),i.scrollbarYActive=null,i.scrollbarYHeight=null,i.scrollbarYTop=null,i.scrollbarYRight=s.toInt(c.css(i.scrollbarYRail,"right")),i.isScrollbarYUsingRight=i.scrollbarYRight==i.scrollbarYRight,i.scrollbarYLeft=i.isScrollbarYUsingRight?null:s.toInt(c.css(i.scrollbarYRail,"left")),i.scrollbarYOuterWidth=i.isRtl?s.outerWidth(i.scrollbarY):null,i.railBorderYWidth=s.toInt(c.css(i.scrollbarYRail,"borderTopWidth"))+s.toInt(c.css(i.scrollbarYRail,"borderBottomWidth")),c.css(i.scrollbarYRail,"display","block"),i.railYMarginHeight=s.toInt(c.css(i.scrollbarYRail,"marginTop"))+s.toInt(c.css(i.scrollbarYRail,"marginBottom")),c.css(i.scrollbarYRail,"display",""),i.railYHeight=null,i.railYRatio=null}function f(e){return e.getAttribute("data-ps-id")}n.add=function(e){var t,n=i();return t=n,e.setAttribute("data-ps-id",t),r[n]=new o(e),r[n]},n.remove=function(e){delete r[f(e)],e.removeAttribute("data-ps-id")},n.get=function(e){return r[f(e)]}},{"../lib/class":2,"../lib/dom":3,"../lib/event-manager":4,"../lib/guid":5,"../lib/helper":6,"./default-setting":8}],19:[function(e,t,n){"use strict";var o=e("../lib/helper"),s=e("../lib/class"),a=e("../lib/dom"),l=e("./instances"),c=e("./update-scroll");function u(e,t){return e.settings.minScrollbarLength&&(t=Math.max(t,e.settings.minScrollbarLength)),t=e.settings.maxScrollbarLength?Math.min(t,e.settings.maxScrollbarLength):t}t.exports=function(e){var t,n,i,r=l.get(e);r.containerWidth=e.clientWidth,r.containerHeight=e.clientHeight,r.contentWidth=e.scrollWidth,r.contentHeight=e.scrollHeight,e.contains(r.scrollbarXRail)||(0<(i=a.queryChildren(e,".ps-scrollbar-x-rail")).length&&i.forEach(function(e){a.remove(e)}),a.appendTo(r.scrollbarXRail,e)),e.contains(r.scrollbarYRail)||(0<(i=a.queryChildren(e,".ps-scrollbar-y-rail")).length&&i.forEach(function(e){a.remove(e)}),a.appendTo(r.scrollbarYRail,e)),!r.settings.suppressScrollX&&r.containerWidth+r.settings.scrollXMarginOffset<r.contentWidth?(r.scrollbarXActive=!0,r.railXWidth=r.containerWidth-r.railXMarginWidth,r.railXRatio=r.containerWidth/r.railXWidth,r.scrollbarXWidth=u(r,o.toInt(r.railXWidth*r.containerWidth/r.contentWidth)),r.scrollbarXLeft=o.toInt((r.negativeScrollAdjustment+e.scrollLeft)*(r.railXWidth-r.scrollbarXWidth)/(r.contentWidth-r.containerWidth))):r.scrollbarXActive=!1,!r.settings.suppressScrollY&&r.containerHeight+r.settings.scrollYMarginOffset<r.contentHeight?(r.scrollbarYActive=!0,r.railYHeight=r.containerHeight-r.railYMarginHeight,r.railYRatio=r.containerHeight/r.railYHeight,r.scrollbarYHeight=u(r,o.toInt(r.railYHeight*r.containerHeight/r.contentHeight)),r.scrollbarYTop=o.toInt(e.scrollTop*(r.railYHeight-r.scrollbarYHeight)/(r.contentHeight-r.containerHeight))):r.scrollbarYActive=!1,r.scrollbarXLeft>=r.railXWidth-r.scrollbarXWidth&&(r.scrollbarXLeft=r.railXWidth-r.scrollbarXWidth),r.scrollbarYTop>=r.railYHeight-r.scrollbarYHeight&&(r.scrollbarYTop=r.railYHeight-r.scrollbarYHeight),t=e,i={width:(n=r).railXWidth},n.isRtl?i.left=n.negativeScrollAdjustment+t.scrollLeft+n.containerWidth-n.contentWidth:i.left=t.scrollLeft,n.isScrollbarXUsingBottom?i.bottom=n.scrollbarXBottom-t.scrollTop:i.top=n.scrollbarXTop+t.scrollTop,a.css(n.scrollbarXRail,i),i={top:t.scrollTop,height:n.railYHeight},n.isScrollbarYUsingRight?n.isRtl?i.right=n.contentWidth-(n.negativeScrollAdjustment+t.scrollLeft)-n.scrollbarYRight-n.scrollbarYOuterWidth:i.right=n.scrollbarYRight-t.scrollLeft:n.isRtl?i.left=n.negativeScrollAdjustment+t.scrollLeft+2*n.containerWidth-n.contentWidth-n.scrollbarYLeft-n.scrollbarYOuterWidth:i.left=n.scrollbarYLeft+t.scrollLeft,a.css(n.scrollbarYRail,i),a.css(n.scrollbarX,{left:n.scrollbarXLeft,width:n.scrollbarXWidth-n.railBorderXWidth}),a.css(n.scrollbarY,{top:n.scrollbarYTop,height:n.scrollbarYHeight-n.railBorderYWidth}),r.scrollbarXActive?s.add(e,"ps-active-x"):(s.remove(e,"ps-active-x"),r.scrollbarXWidth=0,r.scrollbarXLeft=0,c(e,"left",0)),r.scrollbarYActive?s.add(e,"ps-active-y"):(s.remove(e,"ps-active-y"),r.scrollbarYHeight=0,r.scrollbarYTop=0,c(e,"top",0))}},{"../lib/class":2,"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-scroll":20}],20:[function(e,t,n){"use strict";function r(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}var o,s,a=e("./instances");t.exports=function(e,t,n){if(void 0===e)throw"You must provide an element to the update-scroll function";if(void 0===t)throw"You must provide an axis to the update-scroll function";if(void 0===n)throw"You must provide a value to the update-scroll function";"top"===t&&n<=0&&(e.scrollTop=n=0,e.dispatchEvent(r("ps-y-reach-start"))),"left"===t&&n<=0&&(e.scrollLeft=n=0,e.dispatchEvent(r("ps-x-reach-start")));var i=a.get(e);"top"===t&&n>=i.contentHeight-i.containerHeight&&((n=i.contentHeight-i.containerHeight)-e.scrollTop<=1?n=e.scrollTop:e.scrollTop=n,e.dispatchEvent(r("ps-y-reach-end"))),"left"===t&&n>=i.contentWidth-i.containerWidth&&((n=i.contentWidth-i.containerWidth)-e.scrollLeft<=1?n=e.scrollLeft:e.scrollLeft=n,e.dispatchEvent(r("ps-x-reach-end"))),o=o||e.scrollTop,s=s||e.scrollLeft,"top"===t&&n<o&&e.dispatchEvent(r("ps-scroll-up")),"top"===t&&o<n&&e.dispatchEvent(r("ps-scroll-down")),"left"===t&&n<s&&e.dispatchEvent(r("ps-scroll-left")),"left"===t&&s<n&&e.dispatchEvent(r("ps-scroll-right")),"top"===t&&(e.scrollTop=o=n,e.dispatchEvent(r("ps-scroll-y"))),"left"===t&&(e.scrollLeft=s=n,e.dispatchEvent(r("ps-scroll-x")))}},{"./instances":18}],21:[function(e,t,n){"use strict";var i=e("../lib/helper"),r=e("../lib/dom"),o=e("./instances"),s=e("./update-geometry"),a=e("./update-scroll");t.exports=function(e){var t=o.get(e);t&&(t.negativeScrollAdjustment=t.isNegativeScroll?e.scrollWidth-e.clientWidth:0,r.css(t.scrollbarXRail,"display","block"),r.css(t.scrollbarYRail,"display","block"),t.railXMarginWidth=i.toInt(r.css(t.scrollbarXRail,"marginLeft"))+i.toInt(r.css(t.scrollbarXRail,"marginRight")),t.railYMarginHeight=i.toInt(r.css(t.scrollbarYRail,"marginTop"))+i.toInt(r.css(t.scrollbarYRail,"marginBottom")),r.css(t.scrollbarXRail,"display","none"),r.css(t.scrollbarYRail,"display","none"),s(e),a(e,"top",e.scrollTop),a(e,"left",e.scrollLeft),r.css(t.scrollbarXRail,"display",""),r.css(t.scrollbarYRail,"display",""))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-geometry":19,"./update-scroll":20}]},{},[1]);var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(l){var c=/\blang(?:uage)?-([\w-]+)\b/i,t=0,L={manual:l.Prism&&l.Prism.manual,disableWorkerMessageHandler:l.Prism&&l.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof D?new D(e.type,L.util.encode(e.content),e.alias):Array.isArray(e)?e.map(L.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function n(e,i){var r,t,o=L.util.type(e);switch(i=i||{},o){case"Object":if(t=L.util.objId(e),i[t])return i[t];for(var s in i[t]=r={},e)e.hasOwnProperty(s)&&(r[s]=n(e[s],i));return r;case"Array":return t=L.util.objId(e),i[t]||(i[t]=r=[],e.forEach(function(e,t){r[t]=n(e,i)}),r);default:return e}}},languages:{extend:function(e,t){var n,i=L.util.clone(L.languages[e]);for(n in t)i[n]=t[n];return i},insertBefore:function(n,e,t,i){var r,o=(i=i||L.languages)[n],s={};for(r in o)if(o.hasOwnProperty(r)){if(r==e)for(var a in t)t.hasOwnProperty(a)&&(s[a]=t[a]);t.hasOwnProperty(r)||(s[r]=o[r])}var l=i[n];return i[n]=s,L.languages.DFS(L.languages,function(e,t){t===l&&e!=n&&(this[e]=s)}),s},DFS:function e(t,n,i,r){r=r||{};var o,s,a,l=L.util.objId;for(o in t)t.hasOwnProperty(o)&&(n.call(t,o,t[o],i||o),s=t[o],"Object"!==(a=L.util.type(s))||r[l(s)]?"Array"!==a||r[l(s)]||(r[l(s)]=!0,e(s,n,o,r)):(r[l(s)]=!0,e(s,n,null,r)))}},plugins:{},highlightAll:function(e,t){L.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var i={callback:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};L.hooks.run("before-highlightall",i);for(var r,o=i.elements||e.querySelectorAll(i.selector),s=0;r=o[s++];)L.highlightElement(r,!0===t,i.callback)},highlightElement:function(e,t,n){for(var i,r="none",o=e;o&&!c.test(o.className);)o=o.parentNode;o&&(r=(o.className.match(c)||[,"none"])[1].toLowerCase(),i=L.languages[r]),e.className=e.className.replace(c,"").replace(/\s+/g," ")+" language-"+r,e.parentNode&&(o=e.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(c,"").replace(/\s+/g," ")+" language-"+r));function s(e){a.highlightedCode=e,L.hooks.run("before-insert",a),a.element.innerHTML=a.highlightedCode,L.hooks.run("after-highlight",a),L.hooks.run("complete",a),n&&n.call(a.element)}var a={element:e,language:r,grammar:i,code:e.textContent};L.hooks.run("before-sanity-check",a),a.code?(L.hooks.run("before-highlight",a),a.grammar?t&&l.Worker?((t=new Worker(L.filename)).onmessage=function(e){s(e.data)},t.postMessage(JSON.stringify({language:a.language,code:a.code,immediateClose:!0}))):s(L.highlight(a.code,a.grammar,a.language)):s(L.util.encode(a.code))):L.hooks.run("complete",a)},highlight:function(e,t,n){n={code:e,grammar:t,language:n};return L.hooks.run("before-tokenize",n),n.tokens=L.tokenize(n.code,n.grammar),L.hooks.run("after-tokenize",n),D.stringify(L.util.encode(n.tokens),n.language)},matchGrammar:function(e,t,n,i,r,o,s){for(var a in n)if(n.hasOwnProperty(a)&&n[a]){if(a==s)return;for(var l=n[a],l="Array"===L.util.type(l)?l:[l],c=0;c<l.length;++c){var u,f=(m=l[c]).inside,d=!!m.lookbehind,p=!!m.greedy,h=0,g=m.alias;p&&!m.pattern.global&&(u=m.pattern.toString().match(/[imuy]*$/)[0],m.pattern=RegExp(m.pattern.source,u+"g"));for(var m=m.pattern||m,v=i,y=r;v<t.length;y+=t[v].length,++v){var b=t[v];if(t.length>e.length)return;if(!(b instanceof D)){if(p&&v!=t.length-1){if(m.lastIndex=y,!(k=m.exec(e)))break;for(var _=k.index+(d?k[1].length:0),w=k.index+k[0].length,x=v,E=y,T=t.length;x<T&&(E<w||!t[x].type&&!t[x-1].greedy);++x)(E+=t[x].length)<=_&&(++v,y=E);if(t[v]instanceof D)continue;A=x-v,b=e.slice(y,E),k.index-=y}else{m.lastIndex=0;var k=m.exec(b),A=1}if(k){d&&(h=k[1]?k[1].length:0);var w=(_=k.index+h)+(k=k[0].slice(h)).length,S=b.slice(0,_),C=b.slice(w),b=[v,A];S&&(++v,y+=S.length,b.push(S));S=new D(a,f?L.tokenize(k,f):k,g,k,p);if(b.push(S),C&&b.push(C),Array.prototype.splice.apply(t,b),1!=A&&L.matchGrammar(e,t,n,v,y,!0,a),o)break}else if(o)break}}}}},tokenize:function(e,t){var n=[e],i=t.rest;if(i){for(var r in i)t[r]=i[r];delete t.rest}return L.matchGrammar(e,n,t,0,0,!1),n},hooks:{all:{},add:function(e,t){var n=L.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=L.hooks.all[e];if(n&&n.length)for(var i,r=0;i=n[r++];)i(t)}},Token:D};function D(e,t,n,i,r){this.type=e,this.content=t,this.alias=n,this.length=0|(i||"").length,this.greedy=!!r}if(l.Prism=L,D.stringify=function(e,t){if("string"==typeof e)return e;if(Array.isArray(e))return e.map(function(e){return D.stringify(e,t)}).join("");var n={type:e.type,content:D.stringify(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t};e.alias&&(i=Array.isArray(e.alias)?e.alias:[e.alias],Array.prototype.push.apply(n.classes,i)),L.hooks.run("wrap",n);var i=Object.keys(n.attributes).map(function(e){return e+'="'+(n.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+n.tag+' class="'+n.classes.join(" ")+'"'+(i?" "+i:"")+">"+n.content+"</"+n.tag+">"},!l.document)return l.addEventListener&&(L.disableWorkerMessageHandler||l.addEventListener("message",function(e){var t=JSON.parse(e.data),n=t.language,e=t.code,t=t.immediateClose;l.postMessage(L.highlight(e,L.languages[n],n)),t&&l.close()},!1)),L;var e=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return e&&(L.filename=e.src,L.manual||e.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(L.highlightAll):window.setTimeout(L.highlightAll,16):document.addEventListener("DOMContentLoaded",L.highlightAll))),L}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism),Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,t){var n={};n["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[t]},n.cdata=/^<!\[CDATA\[|\]\]>$/i;n={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:n}};n["language-"+t]={pattern:/[\s\S]+/,inside:Prism.languages[t]};t={};t[e]={pattern:RegExp("(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)".replace(/__/g,e),"i"),lookbehind:!0,greedy:!0,inside:n},Prism.languages.insertBefore("markup","cdata",t)}}),Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,function(e){var t=/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,inside:{rule:/@[\w-]+/}},url:{pattern:RegExp("url\\((?:"+t.source+"|[^\n\r()]*)\\)","i"),inside:{function:/^url/i,punctuation:/^\(|\)$/}},selector:RegExp("[^{}\\s](?:[^{};\"']|"+t.source+")*?(?=\\s*\\{)"),string:{pattern:t,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;t=e.languages.markup;t&&(t.tag.addInlined("style","css"),e.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:t.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:e.languages.css}},alias:"language-css"}},t.tag))}(Prism),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,function:/[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|[^\\`])*`/,greedy:!0,inside:{interpolation:{pattern:/\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.js=Prism.languages.javascript;
!function(n){var r={};function a(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=n,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s="./app/assets/es6/app.js")}({"./app/assets/es6/app.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Enlink; });\n/* harmony import */ var _core_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/core */ "./app/assets/es6/core/core.js");\n/* harmony import */ var _theme_configurator_theme_configurator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./theme-configurator/theme-configurator */ "./app/assets/es6/theme-configurator/theme-configurator.js");\n\r\n\r\n\r\nclass Enlink extends _core_core__WEBPACK_IMPORTED_MODULE_0__["default"] {\r\n\r\n    constructor () {\r\n        super()\r\n        this.initThemeConfig()\r\n    }\r\n\r\n    initThemeConfig() {\r\n        _theme_configurator_theme_configurator__WEBPACK_IMPORTED_MODULE_1__["default"].themeConfigurator()\r\n    }\r\n}\r\n\r\n$(() => {\r\n   window.Enlink = new Enlink();\r\n});\r\n\n\n//# sourceURL=webpack:///./app/assets/es6/app.js?')},"./app/assets/es6/core/core.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Core; });\nconst sideNav = '.side-nav'\r\nconst navMenuCollapse = 'nav-menu-collapse'\r\nconst navMenuQuickExpand = 'nav-menu-quick-expand'\r\n\r\nclass Core {\r\n\r\n    constructor() {\r\n\t\tthis.sideNav();\r\n\t\tthis.pfScrollBar();\r\n\t\tthis.tooltipInit();\r\n\t\tthis.popOverInit();\r\n\t\tthis.toastInit();\r\n\t\tthis.headerNav();\r\n\t}\r\n\r\n\tsetLogo() {\r\n\t\tif($(sideNav).hasClass(navMenuCollapse) && !$(sideNav).hasClass(navMenuQuickExpand)) {\r\n\t\t\t$(`${sideNav} .logo img`).attr('src', `/assets/images/logo/${$(sideNav).hasClass('nav-menu-dark') ? 'logo-fold-white' : 'logo-fold'}.png`);\r\n\t\t} else {\r\n\t\t\t$(`${sideNav} .logo img`).attr('src', `/assets/images/logo/${$(sideNav).hasClass('nav-menu-dark') ? 'logo-white' : 'logo'}.png`);\r\n\t\t}\r\n\t}\r\n\r\n\ttoggleNavMenuQuickExpand(action, e) {\r\n\t\tconst $this = $(e.currentTarget);\r\n\t\tif($this.hasClass(navMenuCollapse)) {\r\n\t\t\t$(sideNav)[action]('nav-menu-quick-expand')\r\n\t\t\tthis.setLogo()\r\n\t\t}\r\n\t}\r\n\r\n\theaderNav() {\r\n\t\t$('.header-nav .desktop-toggle').on('click', () => {\r\n\t\t\t$(sideNav).toggleClass(navMenuCollapse)\r\n\t\t\t$('.header-nav').toggleClass('is-collapse')\r\n\t\t\t$('.content').toggleClass('is-collapse')\r\n\t\t\t$('.desktop-toggle .nav-icon').toggleClass('icon-menu')\r\n\t\t\tthis.setLogo()\r\n\t\t});\r\n\r\n\t\t$('.header-nav .mobile-toggle').on('click', () => {\r\n\t\t\t$(sideNav).addClass('is-opened')\r\n\t\t})\r\n\t}\r\n\t\r\n    sideNav() {\r\n\t\tconst active = 'active';\r\n\t\tconst drodpDownItem = '.vertical-menu .nav-menu .nav-submenu .nav-menu .nav-menu-item';\t\r\n\r\n\t\tif ($(drodpDownItem).hasClass(active)) {\r\n\t\t\t$( drodpDownItem + '.' + active).parent().parent().addClass('open') \r\n\t\t}\r\n\r\n        $('.vertical-menu .nav-menu li a').on('click', (e) => {\r\n\t\t\tconst $this = $(e.currentTarget);\r\n\r\n\t\t\tif ($this.parent().hasClass(\"open\")) {\r\n\r\n\t\t\t\t$this.parent().children('.nav-menu').slideUp(200, ()=> {\r\n\t\t\t\t\t$this.parent().removeClass(\"open\");\r\n\t\t\t\t});\r\n\r\n\t\t\t} else {\r\n\t\t\t\t$this.parent().parent().children('li.open').children('.nav-menu').slideUp(200);\r\n\t\t\t\t$this.parent().parent().children('li.open').children('a').removeClass('open');\r\n\t\t\t\t$this.parent().parent().children('li.open').removeClass(\"open\");\r\n\t\t\t\t$this.parent().children('.nav-menu').slideDown(200, ()=> {\r\n\t\t\t\t\t$this.parent().addClass(\"open\");\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t});\r\n\r\n\t\t$(`${sideNav} .nav-logo .mobile-close`).on('click', () => {\r\n\t\t\t$(sideNav).removeClass('is-opened')\r\n\t\t})\r\n\r\n\t\t$(`${sideNav}`).on('mouseenter', e => {\r\n\t\t\tthis.toggleNavMenuQuickExpand('addClass', e)\r\n\t\t}).on('mouseleave', e => {\r\n\t\t\tthis.toggleNavMenuQuickExpand('removeClass', e)\r\n\t\t});\r\n\r\n\t} \r\n\r\n\tpfScrollBar() {\r\n\t\t$('.scrollable').perfectScrollbar();\r\n\t}\r\n\t\r\n\ttooltipInit() {\r\n\t\t$('[data-toggle=\"tooltip\"]').tooltip()\r\n\t}\r\n\r\n\tpopOverInit() {\r\n\t\tconst popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle=\"popover\"]'))\r\n\t\tpopoverTriggerList.map(function (popoverTriggerEl) {\r\n\t\t\treturn new bootstrap.Popover(popoverTriggerEl)\r\n\t\t})\r\n\r\n\t}\r\n\r\n\ttoastInit() {\r\n\t\t$('.toast').toast();\r\n\t}\r\n}    \n\n//# sourceURL=webpack:///./app/assets/es6/core/core.js?")},"./app/assets/es6/theme-configurator/theme-configurator.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\nfunction colorContrast (hex) {\r\n    if(!hex) {\r\n        return 'dark'\r\n    }\r\n    const threshold = 130;\r\n    const hRed = hexToR(hex);\r\n    const hGreen = hexToG(hex);\r\n    const hBlue = hexToB(hex);\r\n    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}\r\n    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}\r\n    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}\r\n    function cutHex(h) {return (h.charAt(0) === '#') ? h.substring(1,7):h}\r\n    const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;\r\n    if (cBrightness > threshold){\r\n        return 'dark'\r\n    } else { \r\n        return 'light'\r\n    }\t\r\n}\r\n\r\nfunction themeConfigurator() {\r\n\r\n    $(document).on('change', 'input[name=\"header-theme\"]', ()=>{\r\n        const context = $('input[name=\"header-theme\"]:checked').val();\r\n        const contrast = colorContrast(context)\r\n        console.log(context, contrast)\r\n        \r\n        $('.header-nav').removeClass (function (index, className) {\r\n            return (className.match (/(^|\\s)header-text-\\S+/g) || []).join(' ');\r\n        }).addClass( 'header-text-'+ contrast ).css('background-color', context);\r\n    });\r\n\r\n    $('#side-nav-theme-toggle').on('change', (e)=> {\r\n        $('.side-nav').toggleClass('nav-menu-dark');\r\n        if(e.target.checked) {\r\n            $('.header-navbar').addClass('nav-menu-dark');\r\n            $('.header-navbar').removeClass('nav-menu-light');\r\n            $('.side-nav .logo img').attr(\"src\", \"/assets/images/logo/logo-white.png\");\r\n        } else {\r\n            $('.header-navbar').addClass('nav-menu-light');\r\n            $('.header-navbar').removeClass('nav-menu-dark');\r\n            $('.side-nav .logo img').attr(\"src\", \"/assets/images/logo/logo.png\");\r\n        }\r\n        e.preventDefault();\r\n    });\r\n    \r\n    $('#side-nav-fold-toogle').on('change', (e)=> {\r\n        $('.side-nav').toggleClass('nav-menu-collapse')\r\n        $('.header-nav').toggleClass('is-collapse');\r\n        $('.content').toggleClass('is-collapse')\r\n        if($('.side-nav').hasClass('nav-menu-collapse')) {\r\n            $('.side-nav .logo img').attr('src', `/assets/images/logo/${$('.side-nav').hasClass('nav-menu-dark') ? 'logo-fold-white' : 'logo-fold'}.png`);\r\n        } else {\r\n            $('.side-nav .logo img').attr('src', `/assets/images/logo/${$('.side-nav').hasClass('nav-menu-dark') ? 'logo-white' : 'logo'}.png`);\r\n        }\r\n        e.preventDefault();\r\n    });\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ themeConfigurator });\n\n//# sourceURL=webpack:///./app/assets/es6/theme-configurator/theme-configurator.js?")}});





// Vendor Files




$(document).ready(function() {


	 toastr.options = {
	                  "closeButton": false,
	                  "debug": false,
	                  "positionClass": "toast-bottom-right",
	                  "onclick": null,
	                  "showDuration": "300",
	                  "hideDuration": "1000",
	                  "timeOut": "5000",
	                  "extendedTimeOut": "1000",
	                  "showEasing": "swing",
	                  "hideEasing": "linear",
	                  "showMethod": "fadeIn",
	                  "hideMethod": "fadeOut"
	              }




	});
