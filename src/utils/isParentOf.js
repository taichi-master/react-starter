function isParentOf ( c, k = 'parentNode' ) {
  var n = c[k]

  while ( n ) {
    if ( n === this )
      return true
    n = n[k]
  }
  return false
}

module.exports = isParentOf.default = isParentOf.isParentOf = isParentOf
