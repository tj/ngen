/**
* This should be your site's pages module
*/

exports.routes = function(app) {
  function index_page(req, res) {    
    res.render('pages/index', {
      locals: {
        title: 'My node.modular site',
        req: req
      }
    });
  }
  
  app.get('/', index_page);
  app.get('/index', index_page);  
  
};
