import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AdminAddDrill() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targets, setTargets] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [released, setReleased] = useState(false);
  const [assests, setAssests] = useState([]); // note: model uses 'assests'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Helpers for assets/actions/conditions
  const addAsset = () => {
    setAssests([
      ...assests,
      {
        name: "",
        imageURL: "",
        file: null,
        type: "model",
        isStatic: false,
        visible: true,
        position: { x: 0, y: 0, z: 0 },
        actions: [],
      },
    ]);
  };
  const removeAsset = (i) => {
    const a = [...assests];
    a.splice(i, 1);
    setAssests(a);
  };
  const updateAsset = (i, field, value) => {
    const a = [...assests];
    a[i] = { ...a[i], [field]: value };
    setAssests(a);
  };
  const updateAssetPosition = (i, axis, value) => {
    const a = [...assests];
    a[i] = { ...a[i], position: { ...a[i].position, [axis]: Number(value) } };
    setAssests(a);
  };
  const handleAssetFile = (i, file) => {
    const a = [...assests];
    a[i].file = file || null;
    // show temporary object URL for preview and to populate imageURL if desired
    if (file) a[i].imageURL = URL.createObjectURL(file);
    setAssests(a);
  };

  const addAction = (assetIdx) => {
    const a = [...assests];
    a[assetIdx].actions = a[assetIdx].actions || [];
    a[assetIdx].actions.push({
      name: "",
      from: 0,
      to: 0,
      framerate: 24,
      loop: false,
      conditions: [],
    });
    setAssests(a);
  };
  const removeAction = (assetIdx, actionIdx) => {
    const a = [...assests];
    a[assetIdx].actions.splice(actionIdx, 1);
    setAssests(a);
  };
  const updateAction = (assetIdx, actionIdx, field, value) => {
    const a = [...assests];
    a[assetIdx].actions[actionIdx] = { ...a[assetIdx].actions[actionIdx], [field]: value };
    setAssests(a);
  };
  const addCondition = (assetIdx, actionIdx) => {
    const a = [...assests];
    a[assetIdx].actions[actionIdx].conditions = a[assetIdx].actions[actionIdx].conditions || [];
    a[assetIdx].actions[actionIdx].conditions.push("");
    setAssests(a);
  };
  const updateCondition = (assetIdx, actionIdx, condIdx, value) => {
    const a = [...assests];
    a[assetIdx].actions[actionIdx].conditions[condIdx] = value;
    setAssests(a);
  };
  const removeCondition = (assetIdx, actionIdx, condIdx) => {
    const a = [...assests];
    a[assetIdx].actions[actionIdx].conditions.splice(condIdx, 1);
    setAssests(a);
  };

  // Targets handlers
  const addTarget = () => setTargets([...targets, ""]);
  const updateTarget = (i, v) => {
    const t = [...targets];
    t[i] = v;
    setTargets(t);
  };
  const removeTarget = (i) => {
    const t = [...targets];
    t.splice(i, 1);
    setTargets(t);
  };

  // Convert File -> base64 data URL
  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });

  const resetForm = () => {
    setName("");
    setDescription("");
    setTargets([""]);
    setInstructions("");
    setReleased(false);
    setAssests([]);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setLoading(true);
    try {
      // For each asset, if file present convert to dataURL and set imageURL
      const assetsPayload = [];
      for (const a of assests) {
        let imageURL = a.imageURL || "";
        if (a.file) {
          // convert to base64 data URL
          imageURL = await fileToDataUrl(a.file);
        }
        assetsPayload.push({
          name: a.name,
          imageURL,
          isStatic: !!a.isStatic,
          type: a.type,
          position: {
            x: Number(a.position?.x || 0),
            y: Number(a.position?.y || 0),
            z: Number(a.position?.z || 0),
          },
          visible: !!a.visible,
          actions: (a.actions || []).map((act) => ({
            name: act.name,
            from: Number(act.from || 0),
            to: Number(act.to || 0),
            framerate: Number(act.framerate || 24),
            loop: !!act.loop,
            conditions: Array.isArray(act.conditions) ? act.conditions.filter(Boolean) : [],
          })),
        });
      }

      const payload = {
        name,
        description,
        assests: assetsPayload,
        targets: targets.filter((t) => t && t.trim()),
        instructions,
        released,
      };

      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/virtualdrills", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || `Failed to create virtual drill (${res.status})`);

      setSuccess("Virtual drill created successfully");
      resetForm();
    } catch (err) {
      console.error("Create virtual drill error:", err);
      setError(err.message || "Failed to create virtual drill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">➕ Create Virtual Drill</h2>

      {error && <div className="mb-4 text-red-600 text-center font-semibold p-2 bg-red-50 rounded">{error}</div>}
      {success && <div className="mb-4 text-green-600 text-center font-semibold">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-blue-300 rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2 border border-blue-300 rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Assets</label>
          <div className="space-y-4">
            {assests.map((asset, ai) => (
              <div key={ai} className="p-4 border border-blue-100 rounded-xl bg-blue-50">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">Asset {ai + 1}</div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => removeAsset(ai)} className="px-2 py-1 bg-red-100 text-red-700 rounded">Remove</button>
                  </div>
                </div>

                <input value={asset.name} onChange={(e) => updateAsset(ai, "name", e.target.value)} placeholder="Asset name" className="w-full px-3 py-2 border rounded mb-2" />

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <select value={asset.type} onChange={(e) => updateAsset(ai, "type", e.target.value)} className="px-3 py-2 border rounded">
                    <option value="model">model</option>
                    <option value="text">text</option>
                    <option value="raw">raw</option>
                  </select>
                  <input type="checkbox" checked={asset.isStatic} onChange={(e) => updateAsset(ai, "isStatic", e.target.checked)} className="self-center" /> <span className="text-sm">Is Static</span>
                </div>

                <div className="mb-2">
                  <label className="block text-sm text-gray-600 mb-1">Image URL (or upload below)</label>
                  <input value={asset.imageURL || ""} onChange={(e) => updateAsset(ai, "imageURL", e.target.value)} placeholder="https://..." className="w-full px-3 py-2 border rounded mb-2" />
                  <input type="file" accept="image/*" onChange={(e) => handleAssetFile(ai, e.target.files[0])} className="w-full" />
                  {asset.imageURL && <img src={asset.imageURL} alt="asset" className="mt-2 w-full max-h-44 object-contain rounded border" />}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-2">
                  <input type="number" value={asset.position?.x || 0} onChange={(e) => updateAssetPosition(ai, "x", e.target.value)} className="px-2 py-1 border rounded" placeholder="x" />
                  <input type="number" value={asset.position?.y || 0} onChange={(e) => updateAssetPosition(ai, "y", e.target.value)} className="px-2 py-1 border rounded" placeholder="y" />
                  <input type="number" value={asset.position?.z || 0} onChange={(e) => updateAssetPosition(ai, "z", e.target.value)} className="px-2 py-1 border rounded" placeholder="z" />
                </div>

                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Actions</div>
                    <button type="button" onClick={() => addAction(ai)} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">+ Action</button>
                  </div>

                  {(asset.actions || []).map((act, aj) => (
                    <div key={aj} className="p-3 mb-2 border border-blue-200 rounded bg-white">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-semibold">Action {aj + 1}</div>
                        <button type="button" onClick={() => removeAction(ai, aj)} className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">Remove</button>
                      </div>

                      <input value={act.name} onChange={(e) => updateAction(ai, aj, "name", e.target.value)} placeholder="Action name" className="w-full px-3 py-2 border rounded mb-2" />

                      <div className="grid grid-cols-4 gap-2 mb-2">
                        <input type="number" value={act.from} onChange={(e) => updateAction(ai, aj, "from", e.target.value)} placeholder="from" className="px-2 py-1 border rounded" />
                        <input type="number" value={act.to} onChange={(e) => updateAction(ai, aj, "to", e.target.value)} placeholder="to" className="px-2 py-1 border rounded" />
                        <input type="number" value={act.framerate} onChange={(e) => updateAction(ai, aj, "framerate", e.target.value)} placeholder="framerate" className="px-2 py-1 border rounded" />
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={act.loop} onChange={(e) => updateAction(ai, aj, "loop", e.target.checked)} />
                          <span className="text-sm">Loop</span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Conditions</div>
                          <button type="button" onClick={() => addCondition(ai, aj)} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">+ Condition</button>
                        </div>
                        {(act.conditions || []).map((cond, ci) => (
                          <div key={ci} className="flex gap-2 items-center">
                            <input value={cond} onChange={(e) => updateCondition(ai, aj, ci, e.target.value)} className="flex-1 px-2 py-1 border rounded" placeholder="condition" />
                            <button type="button" onClick={() => removeCondition(ai, aj, ci)} className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">X</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <button type="button" onClick={addAsset} className="px-4 py-2 bg-blue-600 text-white rounded-lg">+ Add Asset</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Targets</label>
          <div className="space-y-2">
            {targets.map((t, ti) => (
              <div key={ti} className="flex gap-2">
                <input value={t} onChange={(e) => updateTarget(ti, e.target.value)} className="flex-1 px-3 py-2 border rounded" placeholder="target" />
                <button type="button" onClick={() => removeTarget(ti)} className="px-3 py-1 bg-red-100 text-red-700 rounded">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addTarget} className="px-3 py-1 bg-white border rounded">Add Target</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Instructions</label>
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={3} className="w-full px-4 py-2 border border-blue-300 rounded-lg" />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={released} onChange={(e) => setReleased(e.target.checked)} />
            <span className="text-sm">Released</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={resetForm} className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg">Reset</button>
          <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">{loading ? "Submitting..." : "Create Virtual Drill"}</button>
        </div>
      </form>
    </div>
  );
}