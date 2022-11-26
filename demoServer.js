const{events, templateEvents, templatesList} = require(`./templates`)
const http = require(`http`);
const routes = require(`./TemplatesRouter`);
const port = 8080;


http.createServer(routes).listen(port);



// http.createServer(
//      function (req, res) {
//
//          const url = new URL(req.url, `http://${req.headers.host}`);
//
//
//          if (url.pathname === `/templates`) {
//
//             const templateID = url.searchParams.has(`id`) ? url.searchParams.get(`id`) : null;
//
//              switch (req.method) {
//
//                  case "GET":
//
//                      if (templateID) {
//
//                          res.end(JSON.stringify(templatesList().find(temp => temp.template_id == templateID)));
//                      } else
//                      {
//                          res.end(JSON.stringify((templatesList())));
//                      }
//                      break;
//
//                  case "POST":
//                         req.on('data', template =>{
//                             template = JSON.parse(template.toString());
//                             templateEvents.emit(events.CREATE, template);
//                         });
//                         res.end();
//                      break;
//                  case "PUT":
//                      if (templateID) {
//                          req.on('data', template =>{
//                              template = JSON.parse(template.toString());
//                              templateEvents.emit(events.EDIT, templateID, template);
//                          });
//                      }
//                      res.end();
//                      break;
//                  case "DELETE":
//                      req.on('data', deleteID => {
//                          deleteID = JSON.parse(deleteID.toString()).template_id;
//                          templateEvents.emit(events.DELETE, deleteID);
//                      });
//                      res.end();
//                      break;
//               }
//           }
//       }
// ).listen(port);


