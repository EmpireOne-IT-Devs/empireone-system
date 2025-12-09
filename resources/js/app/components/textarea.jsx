export default function Textarea({
    label = 'Message',
    placeholder = 'Type here...',
    rows = 4,
    error
}) {
    return (
        <div className="w-full max-w-md">
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
                {label}
            </label>
            <textarea
                id="message"
                rows={rows}
                placeholder={placeholder}
                className="block w-full resize-none rounded-lg border border-gray-300 p-2.5 shadow-sm sm:text-sm"
            />
            {
                error && <p className="mt-1 text-sm text-red-600">{error}</p>
            }
        </div>
    );
}

// Usage example:
// <TailwindTextarea label="Your Feedback" placeholder="Write your feedback here" rows={6} />
