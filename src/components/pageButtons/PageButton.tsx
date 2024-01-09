import { usePage } from "@/store";
import { FunctionComponent } from "react";
import styles from "./PageButton.module.scss";

interface PageButtonComponentProps{
    totalPages: number;
    type: "userList" | "postList";
}
const PageButtonComponent: FunctionComponent<PageButtonComponentProps> = (props) => {

    const {userPage, setUserPage, postPage, setPostPage} = usePage();

    const page = props.type === "userList" ? userPage : postPage;
    const setPage = props.type === "userList" ? setUserPage : setPostPage;

    return <>
    <div className={styles.buttonWrapper}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0 ? true : false}>Prev</button>
        <span>{page + 1}/{Math.ceil(props.totalPages / 12)}</span>
        <button onClick={() => setPage(page + 1)} disabled={page + 1 > props.totalPages / 12 ? true : false}>Next</button>
    </div>
    </>
}

export default PageButtonComponent;