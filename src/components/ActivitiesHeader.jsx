import { useState } from 'react';
import { BASE_URL} from "../api";
const ActivitiesHeader = ({allActivities,setDisplayedActivities,displayedActivities,myProfile,createWindowOpen,setCreateWindowOpen}) => {
  const [searchValue, setSearchValue] = useState('');

  export default function handleSearchActivities()
  {
    event.preventDefault();
    const filteredSearch = allActivities.filter(
      (activity) =>
        activity.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        activity.description
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase())
    );
    setDisplayedActivities(filteredSearch);
  };
  
  return (
    <div id="activities-header">
      <div>
        <p>Returning {displayedActivities.length} activities...</p>
        <div id="activity-search">
          <form
            action="filter-activities"
            onSubmit={(event) => handleSearchActivities(event, searchValue)}
          >
            <input
              id="filter-activities-search"
              type="text"
              placeholder="Enter a Keyword to narrow your activity search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <button id="filter-activities-button">Filter Activities</button>
          </form>
        </div>
      </div>
      {myProfile.id && (
        <div>
          {!createWindowOpen ? (
            <button
              id="open-close-create-activity"
              onClick={() => setCreateWindowOpen(true)}
            >
              Create New Activity
            </button>
          ) : (
            <button
              id="open-close-create-activity"
              onClick={() => setCreateWindowOpen(false)}
            >
              Cancel Create Activity
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivitiesHeader;
