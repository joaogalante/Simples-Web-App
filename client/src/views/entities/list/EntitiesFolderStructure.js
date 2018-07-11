import {Tree} from 'antd'
import React from 'react'

import Content from '../../../components/structure/Content'
import LoadingSpinnerWrapper from '../../../logicContainers/loading/LoadingSpinnerWrapper'

const TreeNode = Tree.TreeNode

const renderNodes = root => (
  <TreeNode title={root.name} key={root.name}>
    {(root.childNodes || []).map((node, index) => renderNodes(node))}
  </TreeNode>
)

const ControlFolderStructure = ({loading, root}) => (
  <LoadingSpinnerWrapper loading={loading}>
    <Content basicPadding>{!!root.childNodes && <Tree showLine>{renderNodes(root)}</Tree>}</Content>
  </LoadingSpinnerWrapper>
)

export default ControlFolderStructure
