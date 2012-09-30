Behance = Behance || {};
Behance.CollectionsCollection = {};

/**
 * Behance collections collection.
 */
Behance.CollectionsCollection = Behance.Collection.extend({
  model : Backbone.Model,
  
  // Special params object for API pagination, etc., including defaults.
  params : {
    page: 1
  },
  
  url : function () {
    return Behance.api_url + 'users/' + this.user + '/collections?api_key=' + Behance.api_key + '&' + $.param(this.params);
  },
  
  /**
   * Get a specific collections page.
   * @param {String} name Collection name to fetch results for.
   * @param {Number|String} page Page number.
   */
  getPage : function (page) {
    switch (page) {
      case 'next':
        page = this.params.page + 1;
        break;
        
      case 'prev':
        page = this.params.page < 1 ? 1 : this.params.page - 1;
        break;
        
      default:
        page = parseInt(page, 10);
    };
    
    this.params.page = page;
    this.fetch();
  },
  
  /**
   * See the current page number.
   */
  getCurrentPageNumber : function () {
    return this.params.page;
  },
  
  /**
   * The Behance API returns a 'collections' object. We want the contents of the object.
   * @param {Object} response The response from the server.
   */
  parse : function (response) {
    return response.collections;
  } // BehanceCollectionsCollection#parse
  
});