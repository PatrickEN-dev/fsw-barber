import { Card, CardContent } from "../ui/card";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import BookingHeader from "./BookingHeader";
import BookingBody from "./BookingBody";
import BookingFooter from "./BookingFooter";
import { Booking } from "@prisma/client";

interface BookingCardProps {
  booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="py-0 flex px-0">
            {/* <BookingHeader isBookingConfirmed={booking.isFuture} /> */}
            <BookingBody booking={booking} />
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0">
        {/* <BookingHeader isBookingConfirmed={booking.isFuture} /> */}
        <BookingBody booking={booking} />
        <BookingFooter booking={booking} />
      </SheetContent>
    </Sheet>
  );
};

export default BookingCard;
