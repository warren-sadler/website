import React, { useCallback, useState } from "react"
import type { Directory, File } from "@/workspaces/domain/workspace"
import { FileNode } from "./file-node"
import { FileTree } from "./file-tree"

export declare namespace DirectoryNode {
  export interface Props {
    readonly node: Directory
    readonly depth: number
    readonly onClick?: DirectoryNode.OnClick
  }

  export interface OnClick {
    (event: React.MouseEvent<HTMLButtonElement>, node: File | Directory): void
  }
}

export const DirectoryNode: React.FC<DirectoryNode.Props> = ({
  node,
  depth,
  onClick
}) => {
  const [open, setOpen] = useState(true)

  const toggle = useCallback(() => setOpen((prev) => !prev), [])

  return (
    <div>
      <FileNode
        type="directory"
        node={node}
        depth={depth}
        isOpen={open}
        onClick={toggle}
      />
      {open && (
        <FileTree tree={node.children} depth={depth + 1} onClick={onClick} />
      )}
    </div>
  )
}

DirectoryNode.displayName = "DirectoryNode"
