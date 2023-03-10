const http = require('http');
const mongodb = require('mongodb');

const hostname = '127.0.0.1'; 
const port = 3000;

const url = 'mongodb://127.0.0.1:27017';
const mongoClient = new mongodb.MongoClient(url);

const defaultItems = [{
   date: "1/6/2023",
   title: "drei König",
}];


async function startServer() {
    // connect to database
    await mongoClient.connect();
    // optional: defaultItems einfügen, wenn Collection noch nicht existiert
    let collections = await mongoClient.db('calendar').listCollections().toArray();
    if(!collections.find(collection => collection.name == 'event')){
        mongoClient.db('calendar').collection('event').insertMany(defaultItems);
    }
    // listen for requests
    if(mongoClient.connect) {
        server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
            
    });
        } else {
            console.log('Database not found')
        }
}

const server = http.createServer(async (request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Access-Control-Allow-Origin', '*'); // bei CORS Fehler
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  const id = url.searchParams.get('id');
  const itemCollection = mongoClient.db('calendar').collection('event');
  let urlpathname = url.pathname.toString();
  let pathsplit = urlpathname.split("/");
  let eventId = pathsplit[2] + "/" + pathsplit[3] + "/" + pathsplit[4];
  let pathurl = pathsplit[1];
  console.log("test" + eventId);
  console.log(url.pathname);
  switch ("/" + pathurl) {
    case '/getItems':
        let items = await itemCollection.find({}).toArray();
        //console.log("getItems", items)
        response.write(JSON.stringify(items));
        break;
        case '/getEvent':
            console.log('here');
            if(eventId){
                console.log('there');
                let event = await itemCollection.find({
                    date: eventId,
                },{
                }).toArray();
                if(event.length >= 1){
                    console.log('bad');
                    response.write(JSON.stringify(event));
                    response.statusCode = 200;
                }else{
                    console.log('good');
                    response.statusCode = 404;
                    
                }
            }
        break;
    case '/setItem':
        if(request.method === 'POST') {
            let jsonString = '';
            request.on('data', (data) => {
                jsonString += data;
            });
            request.on('end', () => {
                newItem = JSON.parse(jsonString);
                if(newItem._id){ // update
                    //console.log("update", newItem);
                    newItem._id = mongodb.ObjectId(newItem._id); // von Zahl zu MongoDB ID Objekt konvertieren
                    itemCollection.replaceOne({
                        _id: newItem._id,
                    },
                    newItem);
                }
                else{ // add
                    //console.log("insert", newItem);
                    itemCollection.insertOne(newItem);
                }
            });
        }
        case '/removeItem':
            if(eventId){
                result = await itemCollection.deleteOne({
                    date: eventId,
                });
            }
        break;
    case '/getEventsForThisMonth':
        console.log("Drin!");
        response.setHeader('Content-Type', 'application/json');
        // Connect to the database and retrieve events for this month
        const events = await getEventsForThisMonthFromDB(eventId);
        response.write(JSON.stringify(events));
        break;
    
    default:
        response.statusCode = 404;
  }
  response.end();
});

async function getEventsForThisMonthFromDB(eventId) {
    
    // Connect to the database and retrieve events for this month
    const eventCollection = mongoClient.db('calendar').collection('event');

    // Extract month and year from the eventId
    const dateParts = eventId.split("/");
    const month = dateParts[0];
    const year = dateParts[2];
    // Create start and end dates for the current month
    const startDate = new Date(year, month-1, 1);
    const startDateFormatted = startDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });
    const endDate = new Date(year, month, 1);
    const endDateFormatted = endDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });
    console.log(startDateFormatted);
    console.log(endDateFormatted);
    // Retrieve events from the collection
    const events = await eventCollection.find({
        date: { $gte: startDateFormatted, $lt: endDateFormatted }, 
    }).toArray();
    return events;
}

startServer();