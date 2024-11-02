import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/pages';

const es = initEdgeStore.create();

/**
 * This is the main router for the edgestore buckets.
 */
const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket(),
});

export default createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});
<div className="blogpagination">
                            <input onChange={(e) => {
                                setFile(e.target.files?.[0]);
                            }} class="block w-full text-sm text-gray-900 border border-gray-300 !rounded-lg !cursor-pointer bg-gray-50 !focus:outline-none mx-4 dark:bg-gray-700 dark:border-gray-600" id="multiple_files" type="file" multiple />
                            <button onClick={async () => {
                                if (file) {
                                    const res = await edgestore.publicFiles.upload({
                                        onProgressChange: (progress) => {
                                            // you can use this to show a progress bar
                                            console.log(progress);
                                        },
                                    });
                                    // you can run some server action or API here
                                    // to add the necessary data to your database
                                    console.log(res);
                                }
                            }} type="button" class="active">Upload</button>
                        </div>