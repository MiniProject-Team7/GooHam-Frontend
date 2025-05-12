import { Participant } from "@/app/postDetail/page";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ParticipantList = ({ participants }: { participants: Participant[] }) => {
  return (
    <Card className="p-4 w-full rounded-xl text-m bg-white">
      <div className="p-2 text-lg font-semibold mb-0">현재 참여 인원</div>
      <ul className="space-y-2">
        {participants.map((participant, id) => (
          <li key={id} className="flex items-center gap-2 p-2">
            <Avatar>
              <AvatarImage src={participant.profileImg} />
              <AvatarFallback>{participant.name}</AvatarFallback>
            </Avatar>
            {participant.name}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ParticipantList;
