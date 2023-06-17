import fs from 'fs';
// import {checkScheduledTasks} from './dataService.js'
import { NextResponse } from 'next/server';

export async function GET(req){
  const { method, body } = await req.json();
  return new Response(body)
}

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  try{
    const { jsonEmail, jsonDateTime, jsonTodos } = body;
    const data = { jsonEmail, jsonTodos, jsonDateTime };
    const filePath = `./${jsonEmail}.json`;

    fs.writeFile(filePath, JSON.stringify({jsonEmail, jsonTodos, jsonDateTime}), (err) => {
      if (err) {
        console.error(err);
        return new Response("failed to save todos")
        } else {
        return new Response("done");
      }
    }); 
  }
  catch(error){
    console.log(error)
    return new Response(error)
  }

  checkScheduledTasks();
  
  return new Response('OK');

}




// Run the checkScheduledTasks function every 10 minutes
// setInterval(checkScheduledTasks, 10 * 60 * 1000);
