import fs from 'fs';
import {checkScheduledTasks} from '..\dataService.js'

export default function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const { email, todos, datetime } = JSON.parse(body);
    const data = { email, todos, datetime };
    const filePath = `./${email}.json`;

    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save todos' });
      } else {
        res.status(200).json({ message: 'Todos saved successfully' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  checkScheduledTasks()


}




// Run the checkScheduledTasks function every 10 minutes
setInterval(checkScheduledTasks, 10 * 60 * 1000);
