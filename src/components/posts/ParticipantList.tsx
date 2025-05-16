"use client";
import { useState } from "react";
import { Participant } from "@/app/(afterAuth)/posts/postData";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ParticipantList = ({ participants }: { participants: Participant[] }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleParticipants = showAll ? participants : participants.slice(0, 4);
  const isOverflow = participants.length > 4;

  return (
    <Card className="p-4 w-full rounded-xl text-m bg-white">
      <div className="p-2 text-lg font-semibold mb-0">현재 참여 인원</div>
      <ul className="divide-y divide-gray-22">
        {visibleParticipants.map((participant, idx) => (
          <li key={idx} className="flex items-center gap-2 px-3 py-4">
            <Avatar>
              <AvatarImage src={participant.profileImg} />
              <AvatarFallback>{participant.name}</AvatarFallback>
            </Avatar>
            {participant.name}
          </li>
        ))}
      </ul>
      {!showAll && isOverflow && (
        <button
          onClick={() => setShowAll(true)}
          className="text-sm text-gray-500 mt-2 hover:text-gray-700 focus:outline-none"
        >
          더보기
        </button>
      )}
    </Card>
  );
};

export default ParticipantList;
