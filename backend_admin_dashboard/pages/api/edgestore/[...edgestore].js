import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/pages';

const es = initEdgeStore.create();

/**
 * This is the main router for the edgestore buckets.
 */
const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket()
        .beforeDelete(({ ctx, fileInfo }) => {
            // console.log('beforeDelete', ctx, fileInfo);
            return true; // Return `true` to allow the delete
        }),
});

export default createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});