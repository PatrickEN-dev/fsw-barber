ALTER TABLE
    "User"
ADD
    COLUMN "updatedAt" timestamp with time zone NOT NULL DEFAULT now();

ALTER TABLE
    "Barbershop"
ADD
    COLUMN "updatedAt" timestamp with time zone NOT NULL DEFAULT now();

ALTER TABLE
    "Service"
ADD
    COLUMN "updatedAt" timestamp with time zone NOT NULL DEFAULT now();

ALTER TABLE
    "Booking"
ADD
    COLUMN "updatedAt" timestamp with time zone NOT NULL DEFAULT now();