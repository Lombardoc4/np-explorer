import { useEffect } from "react"
import { styled } from "styled-components"

export interface ModalProps {
    isOpen: boolean,
    closeAction: () => void
    children: JSX.Element
    styles?: React.CSSProperties,
    overlayStyles?: React.CSSProperties,
}

export const Modal = ({isOpen, closeAction, styles, overlayStyles, children}: ModalProps) => {
    const handleClose = (e: React.MouseEvent) => {
        const { id } = e.target as HTMLDivElement
        if (id === 'modal-overlay') {
            closeAction();
        }
    }
    	// Keyboard events for closing the modal and switching images
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {closeAction();}
	};

	useEffect(() => {
        if (isOpen)
            document.documentElement.classList.add('no-scroll');

		// TODO; scroll to active image
		// Add keyboard event listener for closing the modal and switching images
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			// Remove event listener on unmount
			window.removeEventListener("keydown", handleKeyDown);
            document.documentElement.classList.remove('no-scroll');

		};
	}, [isOpen]);

    if (!isOpen) {
        return <></>
    }

    return (
        <Overlay onClick={handleClose} id="modal-overlay" style={{...overlayStyles}}>
            <StyledModal style={{...styles}}>
                {children}
            </StyledModal>
        </Overlay>
    )
}

const Overlay = styled.div.attrs({className: 'overlay'})`
    position: fixed;
    z-index: ${({theme}) => theme.zIndex.modal} !important;
`

const StyledModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background-color: ${({theme}) => theme.colors.white};
    border-radius: ${({theme}) => theme.radius.md};
`