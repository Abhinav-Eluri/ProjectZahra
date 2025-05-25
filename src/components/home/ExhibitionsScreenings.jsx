import React from 'react';

export default function ExhibitionsScreenings() {
    const exhibitions = [
        {
            title: "Voices from the Borderlands",
            type: "Solo Exhibition",
            description: "A multimedia installation exploring the liminal spaces between cultures and identities.",
            venue: "Museum of Contemporary Art",
            location: "Berlin, Germany",
            date: "June - September 2023"
        },
        {
            title: "Echoes of Kabul",
            type: "Film Screening & Director's Talk",
            description: "Award-winning documentary on women artists in Afghanistan.",
            venue: "Sundance Film Festival",
            location: "Park City, Utah",
            date: "January 2022"
        },
        {
            title: "Threads of Memory",
            type: "Group Exhibition",
            description: "Textile-based installation exploring cultural heritage and memory.",
            venue: "Venice Biennale",
            location: "Venice, Italy",
            date: "April - November 2022"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-black dark:text-white mb-6">
                        Exhibitions & Screenings
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Our work has been featured in galleries, museums, and film festivals around the world
                    </p>
                </div>

                {/* Exhibition Cards */}
                <div className="space-y-8">
                    {exhibitions.map((exhibition, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                                {/* Left Content */}
                                <div className="lg:w-2/3 mb-6 lg:mb-0">
                                    <h2 className="text-3xl font-bold text-black dark:text-white mb-3">
                                        {exhibition.title}
                                    </h2>
                                    <div className="mb-4">
                    <span className="inline-block bg-purple-600 dark:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {exhibition.type}
                    </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                        {exhibition.description}
                                    </p>
                                </div>

                                {/* Right Content */}
                                <div className="lg:w-1/3 lg:text-right">
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                                        {exhibition.venue}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        {exhibition.location}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {exhibition.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
