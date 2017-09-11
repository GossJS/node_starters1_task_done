import http from 'http';
import m from 'moment';

http.createServer(
  (req,res) => {
    res.setHeader('myname', 'elias');
    if (req.url == '/quit') {
      //мгновенное прекращение обслуживания
      process.exit();
    }
    if (req.url == '/stop') {
      //прекращение при следующем запросе
      process.nextTick(()=>{throw new Error('Stop!')});
    }

    if ( /^\/length\?/.test (req.url)       ) {
      res.end( String (req.url.split('?')[1].length)  );
    }

    if (req.url == '/time') {
      res.end(  m().format('DD-MM-YYYY HH:mm') );

    }

    res.end(`you asked: ${req.url}`);
  }
)
 .listen(4321, ()=>console.log(`started ${process.pid}`));
