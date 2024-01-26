export default function Layout({ children }): JSX.Element {
	return (
		<html lang="en" class="h-full">
			<head>
				<title>Example Quotes App</title>
				<link rel="stylesheet" href="./public/app.css" />
				<script src="./public/index.js" defer />
			</head>
			<body
				x-data="{
                    foo: 'bar',
                }"
				class="h-full"
			>
				{children}
			</body>
		</html>
	);
}
