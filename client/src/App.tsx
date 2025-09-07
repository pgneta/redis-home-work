import React, {useEffect} from 'react';
import {GitHubUser} from "./Components/User/User";
import {
    Avatar,
    Card,
    Container, PublicRepoBadge,
    UserName
} from "./Components/User/styles";
import {Pagination} from "./Components/Pagination/Pagination";
import {Header, Styles, TotalCountMessage,  ErrorMessage, LoadingMessage,} from './styles';

function App() {


    const [users, setUsers] = React.useState<GitHubUser[]>([]);
    const [search, setSearch] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [selectedPage, setSelectedPage] = React.useState(1);
    const [totalResultsCount, setTotalResultsCount] = React.useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
            setError('');
            fetchUsers(search, 1);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const fetchUsers = async (search: string, selectedPage: number) => {
        const filter = search.length === 0 ? 'a' : search; //an empty filter is showing no results
        const url = `${SERVER_URL}/api/search_github_users?q=${filter}&page=${selectedPage}`;

        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 403) setError('API rate limit exceeded');
                else if (response.status === 422) setError('Only the first 1000 search results are available');
                else setError(`Error: ${response.status}`);
                return false;
            }
            const data = await response.json();
            setUsers(data.users);
            if (data.total_count === 0) {
                setError(data.message || 'No results found');
            }
            setTotalResultsCount(data.total_count);
            setLoading(false);
            return true;
        } catch (error: any) {
            setError(`Failed to fetch users, ${error}`);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const totalPages = totalResultsCount > 0 ? Math.ceil(totalResultsCount / 12) : 1;

    const setPage = async (page: number) => {
        if (page < 1 || page > totalPages) return;
        const success = await fetchUsers(search, page);
        if (success) {
            setSelectedPage(page);
        }
    };

    return (
        <>
            <Styles/>
            <div className="App">
                <header>
                <Header>Users Page</Header>
                    <input placeholder="Search user..."
                           type="text" value={search}
                           onChange={(event) => setSearch(event.target.value)}/>
                    {error.length > 0 && <ErrorMessage>{error}</ErrorMessage>}
                    {loading && <LoadingMessage>Loading...</LoadingMessage>}

                    <Container>
                        {users.map((user) => (
                            <Card key={user.id}
                                  href={user.html_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                            >
                                <Avatar src={user.avatar_url} alt={user.login}/>
                                <UserName>{user.login}</UserName>
                                <PublicRepoBadge>{user.public_repos}</PublicRepoBadge>
                            </Card>
                        ))
                        }
                    </Container>
                    <Pagination selectedPage={selectedPage} totalPages={totalPages} goToPage={setPage}/>
                    <TotalCountMessage>Total found users: {totalResultsCount}</TotalCountMessage>
                </header>
            </div>
        </>
    );
}

export default App;
