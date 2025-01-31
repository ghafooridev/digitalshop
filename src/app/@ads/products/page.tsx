import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import Image from 'next/image';

const Ads = () => {
  return (
    <Card className="w-3/4 flex justify-between items-center">
      <div>
        <CardHeader>
          <CardTitle>on Sale products</CardTitle>
          <CardDescription>
            Buy outdated products with 50% discount
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button>Buy Now</Button>
        </CardFooter>
      </div>
      <Image
        src="/assets/ads.jpg"
        width={300}
        height={200}
        alt="ads"
        className="rounded-tr-lg rounded-br-lg"
      />
    </Card>
  );
};

export default Ads;
