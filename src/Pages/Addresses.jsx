import { useEffect, useState } from "react";
import { Plus, MapPin, Pencil, Trash2 } from "lucide-react";
import API from "../config/api";

export default function Addresses() {
  const [addresses, setAddresses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await API.get(
        "/addresses"
      );

      setAddresses(
        res.data.data || []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    if (
      !window.confirm(
        "Delete this address?"
      )
    )
      return;

    try {
      await API.delete(
        `/addresses/${id}`
      );

      setAddresses((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Addresses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">

      <div className="max-w-4xl mx-auto px-4">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Saved Addresses
            </h1>

            <p className="text-gray-500">
              Manage your delivery
              locations
            </p>
          </div>

          <button
            onClick={() =>
              window.location.assign(
                "/addresses/new"
              )
            }
            className="
              bg-yellow-400
              px-5
              py-3
              rounded-xl
              font-semibold
              flex
              items-center
              gap-2
            "
          >
            <Plus size={18} />
            Add Address
          </button>

        </div>

        {addresses.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">

            <MapPin
              size={50}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-4 text-xl font-semibold">
              No Saved Addresses
            </h2>

            <p className="text-gray-500 mt-2">
              Save addresses to
              checkout faster.
            </p>

          </div>
        )}

        <div className="grid gap-5">

          {addresses.map(
            (address) => (
              <div
                key={address._id}
                className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-sm
                "
              >

                <div className="flex justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <h2 className="font-bold text-lg">
                        {
                          address.title
                        }
                      </h2>

                      {address.isDefault && (
                        <span
                          className="
                          text-xs
                          bg-green-100
                          text-green-700
                          px-2
                          py-1
                          rounded-full
                        "
                        >
                          Default
                        </span>
                      )}

                    </div>

                    <p className="mt-2 text-gray-700">
                      {
                        address.fullAddress
                      }
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      {address.city} •{" "}
                      {
                        address.pincode
                      }
                    </p>

                    {address.landmark && (
                      <p className="text-gray-400 text-sm">
                        Landmark:{" "}
                        {
                          address.landmark
                        }
                      </p>
                    )}

                  </div>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        window.location.assign(
                          `/addresses/edit/${address._id}`
                        )
                      }
                      className="
                        p-3
                        rounded-xl
                        bg-gray-100
                      "
                    >
                      <Pencil
                        size={18}
                      />
                    </button>

                    <button
                      onClick={() =>
                        deleteAddress(
                          address._id
                        )
                      }
                      className="
                        p-3
                        rounded-xl
                        bg-red-50
                        text-red-500
                      "
                    >
                      <Trash2
                        size={18}
                      />
                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}