// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(request, response) {
  if (request.method !=='POST') {
    return response.status(400).json({error: 'METHOD NOT ALLOWED'});
  }

  const session = {};
  console.log(request.method);
  response.status(200).json({session: session});
}
