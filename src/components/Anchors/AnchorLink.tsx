import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

type AnchorLinkProps = {
  anchorId: string;
  title: string;
  children: React.ReactNode;
  verticalOffset?: boolean;
};

export function AnchorLink(props: AnchorLinkProps) {
  return (
    <div className="relative">
      {props.verticalOffset ? (
        <div id={props.anchorId} className="absolute -top-[70px] w-0 h-0 overflow-hidden"></div>
      ) : (
        <div id={props.anchorId}></div>
      )}
      <a href={`#${props.anchorId}`} title={props.title} className="group">
        {props.children}
        <div className="opacity-0 group-hover:opacity-100 inline-block ms-2 h-5 w-5">
          <FontAwesomeIcon icon={faLink} opacity="30%" />
        </div>
      </a>
    </div>
  );
}
