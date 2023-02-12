import Avatar from "boring-avatars";
import classNames from "classnames";

import { AVATARCOLORS } from "@utils/colors";
import type { Option } from "@models/option";

export const PersonAvatar = ({
  person,
  size = 32,
  withBorder = false,
}: {
  person: Option;
  withBorder?: boolean;
  size?: number;
}) => {
  return (
    <div
      className={classNames("relative", {
        "rounded-full border": withBorder,
      })}
    >
      <Avatar
        size={size}
        variant="beam"
        name={person.value}
        colors={[...AVATARCOLORS]}
      />
    </div>
  );
};
