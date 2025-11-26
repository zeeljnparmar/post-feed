function normalizeCursor(cursor) {
  if (typeof cursor === 'number' && !isNaN(cursor)) return cursor;
  return Number.POSITIVE_INFINITY;
}

module.exports = {
  normalizeCursor
};
