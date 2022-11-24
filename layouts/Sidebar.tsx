import styles from "./layout.module.css"
import Link from "next/link"

const Sidebar: React.FC = () => {
	return (
		<div className={styles.sidebar}>
			<ul>
                <li>
                    <Link href={'/scatterplot'} className={styles.link}>Scatterplot</Link>
                </li>
                <li>
                    <Link href={'/Barchart'} className={styles.link}>Barchart</Link>
                </li>
                <li>
                    <Link href={'/Heatmap'} className={styles.link}>Heatmap</Link>
                </li>
            </ul>
		</div>  
	)
}

export default Sidebar
