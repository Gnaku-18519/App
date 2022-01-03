import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton'

export const Wrapper = styled.div`
    margin: 10px;
    width: 95%;
    transform: translate3d(0,0,0);
`;

export const StyledButton = styled(IconButton)`
    position: fixed;
    z-index: 100;
    right: -4.4%;
    top: 10px;
`;