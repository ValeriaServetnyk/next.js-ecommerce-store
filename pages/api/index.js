// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(request, response) {

  response.status(200).json({session: "http://localhost:3001/api/session"});
}