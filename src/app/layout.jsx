import './globals.css';

export const metadata = {
    title: 'YouTube Playlist Views Graph',
    description: 'Visualize YouTube playlist video views.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
