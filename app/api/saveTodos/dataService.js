import fs from 'fs';
import path from 'path';
import emailSender from './emailSender';



const checkScheduledTasks = () => {
  // Get a list of all JSON files in the directory
  const directory = './'; // Specify the directory where your JSON files are located
  const jsonFiles = fs.readdirSync(directory).filter((file) => file.endsWith('.json'));

  // Get the current time
  const currentTime = new Date().toISOString().substring(0, 10);

  // Loop through each JSON file
  jsonFiles.forEach((file) => {
    const filePath = path.join(directory, file);

    try {
      // Read JSON file
      const fileData = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileData);

      const { datetime, email, todos } = data;

      // If current time = dat time, send email
      if (currentTime === datetime) {
        console.log('Datetime:', datetime);
        console.log('Email:', email);
        console.log('Todos:', todos);
        emailSender(email, todos);
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}: ${error.message}`);
    }
  });
};

// Run the checkScheduledTasks function every 10 minutes
setInterval(checkScheduledTasks, 10 * 60 * 1000);


