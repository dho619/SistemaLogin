import styled from "styled-components"

const Div = styled.div`
    /* Sidebar links */
    a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
    border-bottom: 1pt solid #555
    }

    /* Active/current link */
    a.active {
    background-color: #7B68EE !important;
    color: white !important;
    }

    /* Links on mouse-over */
    a:hover:not(.active) {
    background-color: #555;
    color: white;
    }
`

export default Div