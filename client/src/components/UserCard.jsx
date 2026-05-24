export default function UserCard({ user }) {
    if (!user) return null;

    return (
        <div className="text-center">
            {user.profileImage
                ? <img src={user.profileImage} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
                : <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-3xl text-gray-300 mx-auto mb-4">👤</div>
            }
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-400 text-sm">{user.age} let · {user.gender}</p>
            {user.location?.label && (
                <p className="text-gray-400 text-xs mt-1">📍 {user.location.label}</p>
            )}
            {user.bio && (
                <p className="text-gray-500 text-sm mt-2">{user.bio}</p>
            )}
        </div>
    );
}