import { Button } from "@/app/_components/ui/button";

interface ITimeListComponentProps {
  timeList: string[];
  hour: string | undefined;
  handleHourClick: (time: string) => void;
}

const TimeListComponent = ({ timeList, hour, handleHourClick }: ITimeListComponentProps) => {
  return (
    <ul className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden py-6 px-5 border-y border-solid border-secondary mt-2">
      {timeList.map((time, index) => (
        <Button
          type="button"
          variant={hour === time ? "default" : "outline"}
          className="rounded-full"
          key={index}
          onClick={() => handleHourClick(time)}
        >
          {time}
        </Button>
      ))}
    </ul>
  );
};

export default TimeListComponent;
