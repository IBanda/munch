import { Window } from '@progress/kendo-react-dialogs';
import { useQuery, gql, ApolloError } from '@apollo/client';
import { Place } from 'lib/interface';

interface Props {
  id: string;
  setWindow: any;
}

const GET_PLACE = gql`
  query GetPlace($id: ID!) {
    place: restaurant(id: $id) {
      name
      photos {
        photo_reference
      }
      formatted_address
      formatted_phone_number
      geometry {
        location {
          lat
          lng
        }
      }
      website
      opening_hours {
        open_now
      }
      reviews {
        id
        review
        user {
          id
          name
        }
        created_on
      }
    }
  }
`;
export default function PlaceDetails({ id, setWindow }: Props) {
  const { data, error, loading } = useQuery(GET_PLACE, {
    variables: {
      id,
    },
  });

  return (
    <Window
      initialLeft={0}
      initialTop={0}
      className="w-100 h-100"
      minimizeButton={() => null}
      maximizeButton={() => null}
      onClose={() => setWindow({ open: false, id: '' })}
    >
      <Details data={data} error={error} loading={loading} />
    </Window>
  );
}

interface PlaceDetail extends Place {
  formatted_address: string;
  formatted_phone_number: string;
  reviews: {
    id: string;
    review: string;
    user: {
      id: string;
      name: string;
    };
    created_on: string;
  };
}

interface DetailsProps {
  error: ApolloError | undefined;
  loading: boolean;
  data: PlaceDetail;
}

function Details({ error, loading, data }: DetailsProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);
  return null;
}
