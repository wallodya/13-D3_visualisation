import type { AppProps } from "next/app"
import "../styles/index.css"
import Layout from "../components/layouts/Layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</QueryClientProvider>
	)
}
