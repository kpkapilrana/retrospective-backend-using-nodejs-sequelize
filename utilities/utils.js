function generateWhereClause(searches) {
  if (!searches) return "";

  let searchQuery = " WHERE ";
  searches.forEach(search => {
    searchQuery +=
      search.colId + " REGEXP " + generateWhereValues(search.text) + " OR ";
  });

  searchQuery = searchQuery.slice(0, -4);

  return searchQuery;
}

function generateWhereValues(text) {
  //Array<text>
  if (!text) return "";

  let searchValue = "";
  text.forEach(value => {
    searchValue += "|" + value;
  });

  if (searchValue && searchValue.length > 0) {
    searchValue = searchValue.substring(1);
    searchValue = "'" + searchValue + "'";
  }

  return searchValue;
}

function getConfig(moduleArr) {
  let requiredModule;
  let error;
  for (let t = 0; t < moduleArr.length; t++) {
    try {
      requiredModule = require(moduleArr[t]);
      if (requiredModule) return requiredModule;
    } catch (e) {
      error = e;
    }
  }

  throw error;
}

module.exports = {
  generateWhereClause,
  getConfig
};
