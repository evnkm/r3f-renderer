# !pip install --upgrade --quiet objaverse
# !pip install trimesh --quiet

import objaverse
objaverse.__version__

uids = objaverse.load_uids()
len(uids), type(uids)

uids[:10]
annotations = objaverse.load_annotations(uids[:10])
annotations

annotations[uids[0]]
annotations = objaverse.load_annotations()
cc_by_uids = [uid for uid, annotation in annotations.items() if annotation["license"] == "by"]
cc_by_uids[:10]

# Downloading Objs
import multiprocessing
processes = multiprocessing.cpu_count()
processes

import random
random.seed(42)

uids = objaverse.load_uids()
random_object_uids = random.sample(uids, 100)
random_object_uids

objects = objaverse.load_objects(
    uids=random_object_uids,
    download_processes=processes
)
objects

# Trimesh
import trimesh
trimesh.load(list(objects.values())[0]).show()

# LVIS Annotations
lvis_annotations = objaverse.load_lvis_annotations()
lvis_annotations