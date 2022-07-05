import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header cartQ={props.cartQ} />
      {props.children}
      <Footer />
    </div>
  );
}
