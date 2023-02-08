import Avatar from "boring-avatars";
import type { Option } from "../contexts/PeopleContext";

const PersonAvatar = ({ person }: { person: Option }) => {
  console.log(person);
  return (
    <div className="relative">
      <Avatar size={32} variant="marble" colors={person.avatarColors} />
      <span className="absolute inset-0 flex h-full w-full items-center justify-center text-base font-bold capitalize leading-none text-white">
        {person.value.slice(0, 1)}
      </span>
    </div>
  );
};

export default PersonAvatar;
