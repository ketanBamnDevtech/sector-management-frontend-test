import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      if (req.session.user) {
        res.json({
          ...req.session.user,
          isLoggedIn: true,
        })
      } else {
        res.json({
          isLoggedIn: false,
        })
      }
      break;
    case 'POST':
      req.session.destroy()
      res.json({ isLoggedIn: false });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`);  
  } 
}

export default withIronSessionApiRoute(handler, sessionOptions)