import fs from 'fs';
import path from 'path';
import emailSender from './emailSender';



export default async function checkScheduledTasks(){
  // Get a list of all JSON files in the directory
  const directory = 'C:/Users/User/arnavUserFolder/emailReminder/next-reminder'; // Specify the directory where your JSON files are located
  
  const jsonFiles = fs.readdirSync(directory).filter((file) => file.endsWith('gmail.com.json'));

  // Get the current time
  const currentTime = new Date().toISOString().substring(0, 10);

  // Loop through each JSON file
  jsonFiles.forEach((file) => {
    const filePath = path.join(directory, file);
    console.log(file)
    console.log("working till dataService")

    try {
      // Read JSON file
      const fileData = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileData);

      const { jsonDateTime, jsonEmail, jsonTodos } = data;
      console.log("try loop part 1 complete")
      console.log("data:",data)
      console.log(currentTime)

      // If current time = dat time, send email
      if (currentTime === jsonDateTime) {
        console.log('Datetime:', jsonDateTime);
        console.log('Email:', jsonEmail);
        console.log('Todos:', jsonTodos);
        emailSender(jsonEmail, jsonTodos);
        console.log("try loop part 2 complete")
        
      }
      else{
        console.log( jsonDateTime);
      }
    } catch (error) {
      console.log(error);
      console.error(`Error reading file ${filePath}: ${error.message}`);
      
    }
  });
};


// Run the checkScheduledTasks function every 10 minutes



