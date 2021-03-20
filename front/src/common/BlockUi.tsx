import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import React from 'react';
const BlockOverlay = ({ children, blocked }) => <BlockUi blocking={blocked}>{children}</BlockUi>
export default BlockOverlay;