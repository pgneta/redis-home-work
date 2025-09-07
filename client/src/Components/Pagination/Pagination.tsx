import {Container, PageButton} from "./styles";
import {useState} from "react";


export const Pagination = ({
    selectedPage,
    totalPages,
    goToPage,
}: {
    selectedPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
}) =>

{
    const [inputPage, setInputPage] = useState<string>("");

    const pageWindowSize = 5;

    const getPageNumbers = () => {
        let startPage = Math.max(1, selectedPage - Math.floor(pageWindowSize / 2));
        let endPage = Math.min(totalPages, startPage + pageWindowSize - 1);

        if (endPage - startPage + 1 < pageWindowSize) {
            startPage = Math.max(1, endPage - pageWindowSize + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pagesToDisplay = getPageNumbers();

    const handleGoToPage = () => {
    const page = Number(inputPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
        goToPage(page);
        setInputPage("");
    }
};


    return (
        <Container>
            <PageButton
                disabled={selectedPage === 1}
                onClick={() => goToPage( 1)}
            >
                1
            </PageButton>
            <PageButton
                disabled={selectedPage === 1}
                onClick={() => goToPage(selectedPage - 1)}
            >
                Prev
            </PageButton>

            {pagesToDisplay.map(page => (
                <PageButton
                    key={page}
                    onClick={() => goToPage(page)}
                    $active={page === selectedPage}
                >
                    {page}
                </PageButton>
            ))}


            <PageButton
                disabled={selectedPage === totalPages}
                onClick={() => goToPage(selectedPage + 1)
            }
            >
                Next
            </PageButton>

            <div style={{ marginLeft: "10px", display: "flex", gap: "5px" }}>
                <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={inputPage}
                    onChange={(e) => setInputPage(e.target.value)}
                    placeholder="Page #"
                    style={{ width: "70px", padding: "4px" }}
                />
                <PageButton onClick={handleGoToPage}>Go</PageButton>
            </div>
        </Container>
    )
}