import { Button } from '@progress/kendo-react-buttons';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Layout className="h-100 position-relative m__home">
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          top: 80,
          width: '100%',
        }}
        className="row"
      >
        <div className="col-xl-6 d-flex justify-content-center text-center text-xl-left flex-column px-3">
          <h1 className="m__landing-h1">
            Discover great{' '}
            <span className="text-uppercase bg-primary text-white px-1">
              munch
            </span>{' '}
            near you.
          </h1>
          <div className=" mt-4">
            <Link to="/places" className="text-decoration-none">
              <Button icon="marker-pin-target" primary={true}>
                Discover
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-xl-6 d-flex align-items-center justify-content-center justify-content-xl-end ">
          <img
            style={{ maxWidth: '30em', width: '100%' }}
            src="/home.jpg"
            alt="food"
          />
        </div>
      </div>
    </Layout>
  );
}
